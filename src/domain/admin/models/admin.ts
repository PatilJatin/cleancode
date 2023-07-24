// domain/models/admin.ts
export interface AdminRequestModel {
  name: string;
  email: string;
  phone: number;
  brand?: string;
  jobTitle?: string;
  superAdmin?: boolean;
  admin?: boolean;
  permissions?: number[];
  active?: boolean;
  outlet?: string;
}

export interface AdminResponseModel {
  id: string;
  name: string;
  email: string;
  phone: number;
  brand?: string;
  jobTitle?: string;
  superAdmin?: boolean;
  admin?: boolean;
  permissions?: number[];
  active?: boolean;
  outlet?: string;
}
