import { AdminRequestModel } from "../models/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { UpdateAdminUseCase } from "../interfaces/use-cases/update-admin-use-case";

export class UpdateAdmin implements UpdateAdminUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string, data: AdminRequestModel): Promise<void> {
    return this.adminRepository.updateAdmin(id, data);
  }
}
