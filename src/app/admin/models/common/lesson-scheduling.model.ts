// src/app/admin/models/common/lesson-scheduling.model.ts
export interface CourseScheduleOverviewResponseDto {
  scheduleId:   number;
  courseName:   string;
  maxCapacity:  number;
  currentStudentCount: number;
  trainerName:  string;
  trainerId:    number;    // ← Yeni eklendi
  courseDate:   string;    // ISO tarih string olarak geliyor
  startTime:    string;    // "HH:mm"
  endTime:      string;
}

export interface CourseWithScheduleRequestDto {
  name:        string;
  maxCapacity: number;
  trainerId:   number;
  courseDate:  string;     
  startTime:   string;   
  endTime:     string;
}