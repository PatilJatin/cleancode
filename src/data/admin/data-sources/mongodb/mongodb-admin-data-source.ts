import { ObjectId } from "mongodb";
import { AdminDataSource } from "../../interfaces/data-sources/admin-data-source";
import { NoSQLDatabaseWrapper } from "../../../contact/interfaces/data-sources/nosql-database-wrapper";
import {
  AdminRequestModel,
  AdminResponseModel,
} from "../../../../domain/admin/models/admin";

export class MongoDBAdminDataSource implements AdminDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }

  async create(admin: AdminRequestModel): Promise<void> {
       this.db.insertOne(admin);
  }

  async getAll(): Promise<AdminResponseModel[]> {
   
    const admins = await this.db.find({});
    return admins.map((admin) => ({ ...admin }));
  }

  async deleteOne(id: string): Promise<void> {
    const objectId = new ObjectId(id); 
    await this.db.deleteOne(objectId);
  }

  async updateOne(id: string, data: AdminRequestModel): Promise<void> {
    const objectId = new ObjectId(id); 
    await this.db.updateOne(objectId, data);
  }

  async getOne(id: string): Promise<AdminResponseModel | null> {
    const admin = await this.db.findOne({ _id: new ObjectId(id) });
    return admin ? { ...admin } : null;
  }

  async findOne(query: object): Promise<AdminResponseModel | null> {
    const admin = await this.db.findOne(query);
    return admin ? { ...admin } : null;
  }
}
