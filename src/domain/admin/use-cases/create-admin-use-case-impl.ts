import { AdminRequestModel } from "../models/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { CreateAdminUseCase } from "../interfaces/use-cases/create-admin-use-case";

export class CreateAdmin implements CreateAdminUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(admin: AdminRequestModel): Promise<void> {
    return this.adminRepository.createAdmin(admin);
  }
}
