// src/app/admin/models/responses/user-management-response.ts
export interface UserManagementResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  tcNo?: string;
  roleName: string;
  packageName?: string;
  membershipStatus?: string;
  certificateName?: string;
  issuedBy?: string;
  issuedDate?: string;
}