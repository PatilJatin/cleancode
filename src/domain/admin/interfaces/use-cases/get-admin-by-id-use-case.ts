import { AdminResponseModel } from "../../models/admin";

export interface GetAdminByIdUseCase {
  execute(adminId: string): Promise<AdminResponseModel | null>;
}
