import { AdminResponseModel } from "../model/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { GetAllAdminsUseCase } from "../interfaces/use-cases/get-all-admins-use-case";

export class GetAllAdmins implements GetAllAdminsUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(): Promise<AdminResponseModel[]> {
    return this.adminRepository.getAdmins();
  }
}
