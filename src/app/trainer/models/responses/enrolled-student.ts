// src/app/trainer/models/responses/enrolled-student.ts
export interface EnrolledStudentDto {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  bmi: number | null;
  weight: number | null;
  height: number | null;
}