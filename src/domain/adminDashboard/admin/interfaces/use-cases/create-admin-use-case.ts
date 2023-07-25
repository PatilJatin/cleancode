import { AdminRequestModel } from "../../model/admin";

export interface CreateAdminUseCase {
  execute(adminData: AdminRequestModel): Promise<void>;
}
