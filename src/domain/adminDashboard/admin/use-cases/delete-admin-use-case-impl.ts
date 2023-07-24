import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { DeleteAdminUseCase } from "../interfaces/use-cases/delete-admin-use-case";

export class DeleteAdmin implements DeleteAdminUseCase {
  adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<void> {
    return this.adminRepository.deleteAdmin(id);
  }
}
