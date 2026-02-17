// src/app/admin/models/responses/admin-myaccount-response.model.ts
export interface AdminMyAccountResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  tcNo: string;
  accountLocked: boolean;
  roleName: string;
  photoUrl?: string; // opsiyonel alan
}