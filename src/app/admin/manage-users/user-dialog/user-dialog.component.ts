import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementRequest } from '../../models/requests/user-request.model';
import { UpdateUserManagementRequest } from '../../models/requests/update-user-request.model';
import { UserManagementResponse } from '../../models/responses/user-management-response';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  errorMessage: string | null = null;
  isLoading = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  private originalFormValues: any = {};

  roles = [
    { id: 3, name: 'MEMBER' },
    { id: 2, name: 'TRAINER' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: UserManagementResponse },
    private userService: UserManagementService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.user;
    this.initializeForm();
    this.setupFormValidation();
  }

  private initializeForm(): void {
    const passwordValidators = this.isEditMode ? [] : [Validators.required];
    const tcNoValidators = this.isEditMode ? [] : [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern(/^\d{11}$/)
    ];

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordValidators],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      tcNo: ['', tcNoValidators],
      roleId: [null, Validators.required],
      certificateName: [''],
      issuedBy: [''],
      issuedDate: [''],
      packageName: [''],
      membershipStatus: ['']
    });

    if (this.isEditMode && this.data.user) {
      this.loadUserData(this.data.user);
    }
  }

  private loadUserData(user: UserManagementResponse): void {
    const matchedRole = this.roles.find(r =>
      r.name.toLowerCase() === (user.roleName || '').toLowerCase()
    );

    const formData = {
      email: user.email || '',
      password: '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      gender: user.gender || '',
      tcNo: (user as any).tcNo || '',
      roleId: matchedRole?.id ?? null,
      certificateName: user.certificateName || '',
      issuedBy: user.issuedBy || '',
      issuedDate: user.issuedDate ? new Date(user.issuedDate).toISOString().substring(0, 10) : '',
      packageName: user.packageName || '',
      membershipStatus: user.membershipStatus || ''
    };

    this.form.patchValue(formData);
    this.originalFormValues = { ...formData };

    this.updateRoleBasedValidation(matchedRole?.id ?? null);

    this.form.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  private setupFormValidation(): void {
    this.form.get('roleId')?.valueChanges.subscribe(roleId => {
      this.updateRoleBasedValidation(roleId);

      if (roleId === 3) {
        this.form.patchValue({
          packageName: 'Full Package',
          membershipStatus: this.calculateMembershipStatus()
        });
      } else {
        this.form.patchValue({
          packageName: '',
          membershipStatus: ''
        });
      }

      this.form.updateValueAndValidity();
      this.cdr.detectChanges();
    });
  }

  private updateRoleBasedValidation(roleId: number | null): void {
    const controls = [
      'certificateName',
      'issuedBy',
      'issuedDate',
      'packageName',
      'membershipStatus'
    ];

    controls.forEach(name => {
      const ctrl = this.form.get(name)!;
      ctrl.clearValidators();
      ctrl.updateValueAndValidity();
    });

    if (roleId === 2) {
      ['certificateName', 'issuedBy', 'issuedDate'].forEach(name =>
        this.form.get(name)!.setValidators(Validators.required)
      );
    } else if (roleId === 3) {
      ['packageName', 'membershipStatus'].forEach(name =>
        this.form.get(name)!.setValidators(Validators.required)
      );
    }

    controls.forEach(name => {
      this.form.get(name)!.updateValueAndValidity();
    });
  }

  private calculateMembershipStatus(): string {
    return 'ACTIVE';
  }

  get isSaveDisabled(): boolean {
    return this.form.invalid || this.isLoading;
  }

  private getChangedFields(): any {
    const currentValues = this.form.getRawValue();
    const changedFields: any = {};

    Object.keys(currentValues).forEach(key => {
      const currentValue = currentValues[key];
      const originalValue = this.originalFormValues[key];

      if (!this.isEditMode || currentValue !== originalValue) {
        if (this.isEditMode) {
          if (currentValue !== originalValue && currentValue !== '' && currentValue != null) {
            changedFields[key] = currentValue;
          }
        } else {
          changedFields[key] = currentValue;
        }
      }
    });

    return changedFields;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    let requestData: any;

    if (this.isEditMode) {
      requestData = this.getChangedFields();
      const currentTcNo = this.form.get('tcNo')?.value;
      if (currentTcNo === this.originalFormValues.tcNo) {
        delete requestData.tcNo;
      }
      if (!requestData.password) {
        delete requestData.password;
      }
    } else {
      requestData = this.form.getRawValue();
    }

    if (requestData.roleId === 2) {
      delete requestData.packageName;
      delete requestData.membershipStatus;
    } else if (requestData.roleId === 3) {
      delete requestData.certificateName;
      delete requestData.issuedBy;
      delete requestData.issuedDate;
    }

    if (requestData.issuedDate) {
      requestData.issuedDate = new Date(requestData.issuedDate).toISOString().split('T')[0];
    }

    if (this.isEditMode) {
      const updateRequest: UpdateUserManagementRequest = { ...requestData };
      this.dialogRef.close({ updateRequest, file: this.selectedFile, fileName: this.selectedFileName });
      this.isLoading = false;
    } else {
      const createRequest: UserManagementRequest = { ...requestData };
      this.userService.addUser(createRequest).subscribe({
        next: (res) => {
          const userId = res.id;
          this.uploadPhoto(userId);
        },
        error: () => {
          this.toastr.error('User creation failed');
          this.isLoading = false;
        }
      });
    }
  }

  private uploadPhoto(userId: number): void {
    if (!this.selectedFile) {
      this.toastr.success('User created successfully');
      this.dialogRef.close(true);
      return;
    }

    this.userService.uploadUserPhoto(this.selectedFile, userId).subscribe({
      next: () => {
        this.toastr.success('User and photo uploaded successfully');
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastr.warning('User added but photo upload failed');
        this.dialogRef.close(true);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  get shouldShowTcNo(): boolean {
    return !this.isEditMode;
  }
}