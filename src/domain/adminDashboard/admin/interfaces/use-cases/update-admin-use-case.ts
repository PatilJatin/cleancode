import { AdminRequestModel } from "../../model/admin";

export interface UpdateAdminUseCase {
  execute(adminId: string, adminData: AdminRequestModel): Promise<void>;
}
