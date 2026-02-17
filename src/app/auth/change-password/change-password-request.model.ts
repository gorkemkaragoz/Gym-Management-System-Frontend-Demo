// src/app/auth/change-password/change-password-request.model.ts
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}