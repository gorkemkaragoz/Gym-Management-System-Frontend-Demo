// 📁 src/app/admin/models/requests/user-request.model.ts
export interface UserManagementRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  tcNo: string;
  roleId: number;

  // Trainer için
  certificateName?: string;
  issuedBy?: string;
  issuedDate?: string;

  // Member için
  packageName?: string;
  membershipStatus?: string;
}