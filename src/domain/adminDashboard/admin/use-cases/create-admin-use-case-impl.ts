import { AdminRequestModel } from "../models/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { CreateAdminUseCase } from "../interfaces/use-cases/create-admin-use-case";

export class CreateAdmin implements CreateAdminUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminData: AdminRequestModel): Promise<void> {
    const existingAdmin = await this.adminRepository.getAdminByEmail(
      adminData.email
    );
    if (existingAdmin) {
      throw new Error("Email already exists.");
    }
    await this.adminRepository.createAdmin(adminData);
  }
}
