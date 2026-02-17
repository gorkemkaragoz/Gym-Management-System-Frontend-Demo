//  src/app/shared/models/responses/user-myaccount-response.model.ts
export interface UserMyAccountResponse {
 id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  tcNo: string;
  roleName: string;
  packageName?: string;
  membershipStatus?: string;
  certificateName?: string;
  issuedBy?: string;
  issuedDate?: string;
  photoUrl?: string;
}