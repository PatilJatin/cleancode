// domain/repositories/admin-repository.ts
import { AdminDataSource } from "../../../data/admin/interfaces/data-sources/admin-data-source";
import { AdminRequestModel, AdminResponseModel } from "../models/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";

export class AdminRepositoryImpl implements AdminRepository {
  adminDataSource: AdminDataSource;

  constructor(adminDataSource: AdminDataSource) {
    this.adminDataSource = adminDataSource;
  }

  async createAdmin(admin: AdminRequestModel): Promise<void> {
    await this.adminDataSource.create(admin);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminDataSource.deleteOne(id); // Convert string to ObjectId
  }

  async updateAdmin(id: string, data: AdminRequestModel): Promise<void> {
    await this.adminDataSource.updateOne(id, data); // Convert string to ObjectId
  }

  async getAdmins(): Promise<AdminResponseModel[]> {
    return this.adminDataSource.getAll();
  }

  async getAdminById(id: string): Promise<AdminResponseModel | null> {
    return this.adminDataSource.getOne(id);
  }

  async getAdminByEmail(email: string): Promise<AdminResponseModel | null> {
    return this.adminDataSource.findOne({ email });
  }
}
