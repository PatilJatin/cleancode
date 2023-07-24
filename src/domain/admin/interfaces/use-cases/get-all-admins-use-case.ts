import { AdminResponseModel } from "../../models/admin";

export interface GetAllAdminsUseCase {
  execute(): Promise<AdminResponseModel[]>;
}
