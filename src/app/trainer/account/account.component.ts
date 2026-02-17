// src/app/trainer/account/account.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserMyAccountResponse } from 'src/app/shared/models/responses/user-myaccount-response.model';
import { EnrolledStudentDto } from 'src/app/trainer/models/responses/enrolled-student';
import { BodyMeasurementService } from '../services/body-measurement.service';
import { ToastrService } from 'ngx-toastr';
import { BodyMeasurement } from '../models/responses/body-measurement';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: UserMyAccountResponse | null = null;
  students: EnrolledStudentDto[] = [];
  measurements: BodyMeasurement[] = [];

  selectedStudentId: number | null = null;
  weight: number | null = null;
  height: number | null = null;
  bmi: number | null = null;

  constructor(
    private accountService: AccountService,
    private measurementService: BodyMeasurementService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Failed to fetch user info:', err)
    });

    this.loadStudentData();
  }

  loadStudentData(): void {
    this.accountService.getMyStudents().subscribe({
      next: (studentsData) => {
        this.students = studentsData;

        this.accountService.getAllBodyMeasurements().subscribe({
          next: (measurementData) => {
            this.measurements = measurementData;

            // Öğrencilerle en güncel ölçümleri eşleştir
            this.students.forEach(student => {
              const studentMeasurements = this.measurements
                .filter(m => m.userId === student.userId)
                .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());

              if (studentMeasurements.length > 0) {
                const latest = studentMeasurements[0];
                student.weight = latest.weight;
                student.bmi = latest.bmi;
                student.height = latest.height; // 💥 Burası eksikti, bunu ekle
              }
            });
          },
          error: (err) => console.error('Failed to fetch measurements:', err)
        });
      },
      error: (err) => console.error('Failed to fetch students:', err)
    });
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/login/change-password']);
  }

  calculateBmi(): void {
    if (this.height && this.weight && this.height > 0) {
      const heightInMeters = this.height / 100;
      this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(2));
    } else {
      this.bmi = null;
    }
  }

  saveMeasurement(): void {
    if (!this.selectedStudentId || !this.weight || !this.height) {
      this.toastr.warning('Please select a student and enter valid weight and height.');
      return;
    }

    const payload = {
      userId: this.selectedStudentId,
      weight: this.weight,
      height: this.height
    };

    this.measurementService.saveMeasurement(payload).subscribe({
      next: () => {
        this.toastr.success('Measurement saved successfully.');

        // 🔁 Listeyi güncelle
        this.loadStudentData();

        // 🧹 Temizle
        this.selectedStudentId = null;
        this.weight = null;
        this.height = null;
        this.bmi = null;
      },
      error: (err) => {
        this.toastr.error('Failed to save measurement.');
        console.error(err);
      }
    });
  }
}