// src/app/member/models/responses/body-measurement.model.ts
export interface BodyMeasurement {
  id: number;
  height: number;
  weight: number;
  bmi: number;
  createdTime: string; // ISO tarih formatı
}