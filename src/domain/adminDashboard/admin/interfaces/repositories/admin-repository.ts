import { AdminRequestModel, AdminResponseModel } from "../../model/admin";

export interface AdminRepository {
  createAdmin(admin: AdminRequestModel): Promise<void>;
  deleteAdmin(id: string): Promise<void>;
  updateAdmin(id: string, data: AdminRequestModel): Promise<void>;
  getAdmins(): Promise<AdminResponseModel[]>;
  getAdminById(id: string): Promise<AdminResponseModel | null>;
  getAdminByEmail(email: string): Promise<AdminResponseModel | null>;
}
