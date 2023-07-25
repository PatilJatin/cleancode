import { AdminResponseModel } from "../../model/admin";

export interface GetAdminByIdUseCase {
  execute(adminId: string): Promise<AdminResponseModel | null>;
}
