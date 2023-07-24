import { ObjectId } from "mongodb";
import {
  ContactRequestModel,
  ContactResponseModel,
} from "../../../../domain/contact/models/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";

export class MongoDBContactDataSource implements ContactDataSource {
  private db: NoSQLDatabaseWrapper;
  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }
  async deleteOne(id: string) {
    const objectId = new ObjectId(id); // Convert the string id to ObjectId
    await this.db.deleteOne(objectId);
  }
  async updateOne(id: string, data: ContactRequestModel) {
    const objectId = new ObjectId(id); // Convert the string id to ObjectId
    await this.db.updateOne(objectId, data);
  }
  async getOne(id: string): Promise<ContactResponseModel> {
    const objectId = new ObjectId(id); // Convert the string id to ObjectId
    const result = await this.db.find({ _id: objectId });
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
    }))[0];
  }

  async create(contact: ContactRequestModel) {
    await this.db.insertOne(contact);
  }

  async getAll(): Promise<ContactResponseModel[]> {
    const result = await this.db.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
    }));
  }
}
