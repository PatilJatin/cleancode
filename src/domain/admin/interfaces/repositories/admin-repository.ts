// domain/interfaces/repositories/admin-repository.ts
import { AdminRequestModel, AdminResponseModel } from "../../models/admin";

export interface AdminRepository {
  createAdmin(admin: AdminRequestModel): Promise<void>;
  deleteAdmin(id: string): Promise<void>;
  updateAdmin(id: string, data: AdminRequestModel): Promise<void>;
  getAdmins(): Promise<AdminResponseModel[]>;
  getAdminById(id: string): Promise<AdminResponseModel | null>;// New method for finding admins by email
}
