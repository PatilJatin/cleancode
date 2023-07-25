import { ObjectId } from "mongodb";
import {
  AdminRequestModel,
  AdminResponseModel,
} from "../../../../../domain/adminDashboard/admin/model/admin";
import { NoSQLDatabaseWrapper } from "../../../../noSql-db-wrapper/nosql-database-wrapper";

export class MongoDBAdminDataSource {
  private database: NoSQLDatabaseWrapper;

  constructor(database: NoSQLDatabaseWrapper) {
    this.database = database;
  }

  async create(admin: AdminRequestModel): Promise<void> {
    // Implement the logic to create an admin document in the database
    await this.database.insertOne(admin);
  }
  async getAll(): Promise<AdminResponseModel[]> {
    // Implement the logic to fetch all admin documents from the database
    const admins = await this.database.find({});
    return admins.map((admin) => this.mapToAdminResponse(admin));
  }

  async getOne(id: string): Promise<AdminResponseModel | null> {
    // Implement the logic to fetch an admin document from the database by ID
    const admin = await this.database.findOne({ _id: new ObjectId(id) });
    return admin ? this.mapToAdminResponse(admin) : null;
  }

  async deleteOne(id: string): Promise<void> {
    // Implement the logic to delete an admin document from the database by ID
    await this.database.deleteOne(new ObjectId(id));
  }

  async updateOne(id: string, data: AdminRequestModel): Promise<void> {
    // Implement the logic to update an admin document in the database by ID
    await this.database.updateOne(new ObjectId(id), data);
  }

  async findOne(query: object): Promise<AdminResponseModel | null> {
    // Implement the logic to fetch an admin document from the database by a specific query
    const admin = await this.database.findOne(query);
    return admin ? this.mapToAdminResponse(admin) : null;
  }

  private mapToAdminResponse(admin: any): AdminResponseModel {
    // Map the database document to the AdminResponseModel instance
    return new AdminResponseModel(
      admin._id,
      admin.name,
      admin.email,
      admin.phone,
      admin.brand,
      admin.jobTitle,
      admin.superAdmin,
      admin.admin,
      admin.permissions,
      admin.active,
      admin.outlet
    );
  }
}
