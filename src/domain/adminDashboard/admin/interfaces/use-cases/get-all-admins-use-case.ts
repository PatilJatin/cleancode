import { AdminResponseModel } from "../../model/admin";

export interface GetAllAdminsUseCase {
  execute(): Promise<AdminResponseModel[]>;
}
