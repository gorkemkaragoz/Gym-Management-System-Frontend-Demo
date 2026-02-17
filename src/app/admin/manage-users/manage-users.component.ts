// src/app/admin/manage-users/manage-users.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserManagementResponse } from '../models/responses/user-management-response';
import { UserManagementService } from '../services/user-management.service';
import { UserManagementRequest } from '../models/requests/user-request.model';
import { UpdateUserManagementRequest } from '../models/requests/update-user-request.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  allUsers: UserManagementResponse[] = [];
  filteredUsers: UserManagementResponse[] = [];
  searchText = '';
  selectedRole = 'ALL';
  
  displayedColumns: string[] = [
    'name', 'gender', 'role', 'package', 'status', 
    'certificate', 'issuedBy', 'issuedDate', 'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private userService: UserManagementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /** Tüm kullanıcıları yükler */
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        this.filterUsers();
      },
      error: (error) => {
        console.error('Kullanıcılar yüklenemedi:', error);
        this.snackBar.open('Kullanıcılar yüklenirken hata oluştu', 'Tamam', { duration: 3000 });
      }
    });
  }

  /** Arama ve filtre kriterlerine göre kullanıcıları filtreler */
  filterUsers(): void {
    this.filteredUsers = this.allUsers.filter(user => {
      const matchesSearch = !this.searchText || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(this.searchText.toLowerCase());
      
      const matchesRole = this.selectedRole === 'ALL' || user.roleName === this.selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }

  /** Yeni kullanıcı ekleme dialog'unu açar */
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { user: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers(); // Kullanıcı başarıyla eklendiyse listeyi yenile
      }
    });
  }

  /** Kullanıcı düzenleme dialog'unu açar */
 openEditUserDialog(user: UserManagementResponse): void {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '500px',
    data: { user }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.updateRequest) {
      // Önce kullanıcı bilgilerini güncelle
      this.userService.updateUser(user.id, result.updateRequest).subscribe({
        next: (updatedUser) => {
          // Eğer bir dosya seçildiyse, güncelleme sonrası fotoğrafı yükle
          if (result.file) {
            this.userService.uploadUserPhoto(result.file, user.id).subscribe({
              next: () => {
                this.snackBar.open('Kullanıcı ve fotoğraf başarıyla güncellendi', 'Tamam', { duration: 3000 });
                this.loadUsers();
              },
              error: () => {
                this.snackBar.open('Kullanıcı güncellendi ama fotoğraf yüklenemedi', 'Tamam', { duration: 3000 });
                this.loadUsers();
              }
            });
          } else {
            this.snackBar.open('Kullanıcı başarıyla güncellendi', 'Tamam', { duration: 3000 });
            this.loadUsers();
          }
        },
        error: (error) => {
          this.snackBar.open('Güncelleme sırasında hata oluştu', 'Tamam', { duration: 5000 });
        }
      });
    }
  });
}

  /** Yeni kullanıcı ekler */
  private addUser(userRequest: UserManagementRequest): void {
    this.userService.addUser(userRequest).subscribe({
      next: () => {
        this.snackBar.open('Kullanıcı başarıyla eklendi', 'Tamam', { duration: 3000 });
        this.loadUsers(); // Listeyi yeniden yükle
      },
      error: (error) => {
        console.error('Kullanıcı eklenemedi:', error);
        let errorMessage = 'Kullanıcı eklenirken hata oluştu';
        
        // Backend'den gelen hata mesajını kontrol et
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open(errorMessage, 'Tamam', { duration: 5000 });
      }
    });
  }

  /** Kullanıcıyı günceller */
  private updateUser(userId: number, updateRequest: UpdateUserManagementRequest): void {
    this.userService.updateUser(userId, updateRequest).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Kullanıcı başarıyla güncellendi', 'Tamam', { duration: 3000 });
        this.loadUsers(); // Listeyi yeniden yükle
        console.log('Kullanıcı güncellendi:', updatedUser);
      },
      error: (error) => {
        console.error('Kullanıcı güncellenemedi:', error);
        let errorMessage = 'Kullanıcı güncellenirken hata oluştu';
        
        // Backend'den gelen hata mesajını kontrol et
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open(errorMessage, 'Tamam', { duration: 5000 });
      }
    });
  }
}