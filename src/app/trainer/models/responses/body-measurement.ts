// src/app/trainer/models/responses/body-measurement.ts
export interface BodyMeasurement {
  id: number;
  userId: number;
  createdTime: string;
  weight: number;
  height: number;
  bmi: number;
}
