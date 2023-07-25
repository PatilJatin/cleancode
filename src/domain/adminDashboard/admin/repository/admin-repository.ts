import { AdminRequestModel, AdminResponseModel } from "../model/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { MongoDBAdminDataSource } from "../../../../data/adminDashboard/admin/data-sources/mongodb/mongodb-admin-data-source";

export class AdminRepositoryImpl implements AdminRepository {
  private dataSource: MongoDBAdminDataSource;

  constructor(dataSource: MongoDBAdminDataSource) {
    this.dataSource = dataSource;
  }

  async createAdmin(admin: AdminRequestModel): Promise<void> {
    // Implement the logic to create an admin in the data source
    await this.dataSource.create(admin);
  }

  async deleteAdmin(id: string): Promise<void> {
    // Implement the logic to delete an admin from the data source by ID
    await this.dataSource.deleteOne(id);
  }

  async updateAdmin(id: string, data: AdminRequestModel): Promise<void> {
    // Implement the logic to update an admin in the data source by ID
    await this.dataSource.updateOne(id, data);
  }

  async getAdmins(): Promise<AdminResponseModel[]> {
    // Implement the logic to get all admins from the data source
    return this.dataSource.getAll();
  }

  async getAdminById(id: string): Promise<AdminResponseModel | null> {
    // Implement the logic to get an admin from the data source by ID
    return this.dataSource.getOne(id);
  }

  async getAdminByEmail(email: string): Promise<AdminResponseModel | null> {
    // Implement the logic to get an admin from the data source by email
    return this.dataSource.findOne({ email });
  }
}
