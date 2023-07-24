import { AdminRequestModel } from "../../models/admin";

export interface CreateAdminUseCase {
  execute(adminData: AdminRequestModel): Promise<void>;
}
