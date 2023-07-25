import { AdminResponseModel } from "../model/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { GetAdminByIdUseCase } from "../interfaces/use-cases/get-admin-by-id-use-case";

export class GetAdminById implements GetAdminByIdUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<AdminResponseModel | null> {
    return this.adminRepository.getAdminById(id);
  }
}
