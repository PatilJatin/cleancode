import { AdminRequestModel } from "../../models/admin";

export interface UpdateAdminUseCase {
  execute(adminId: string, adminData: AdminRequestModel): Promise<void>;
}
