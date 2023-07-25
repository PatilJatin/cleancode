import { ObjectId } from "mongodb";
import {
  OutletRequestModel,
  OutletResponseModel,
} from "../../../../../domain/adminDashboard/outlet/models/outlet";
import { NoSQLDatabaseWrapper } from "../../../../noSql-db-wrapper/nosql-database-wrapper";

export class MongoDBOutletDataSource {
  private database: NoSQLDatabaseWrapper;

  constructor(database: NoSQLDatabaseWrapper) {
    this.database = database;
  } 

  async create(outlet: OutletRequestModel): Promise<void> {
    // Implement the logic to create an outlet document in the database
    await this.database.insertOne(outlet);
  }

  async getAll(): Promise<OutletResponseModel[]> {
    // Implement the logic to fetch all outlet documents from the database
    const outlets = await this.database.find({});
    return outlets.map((outlet) => this.mapToOutletResponse(outlet));
  }

  async getOne(id: string): Promise<OutletResponseModel | null> {
    // Implement the logic to fetch an outlet document from the database by ID
    const outlet = await this.database.findOne({ _id: new ObjectId(id) });
    return outlet ? this.mapToOutletResponse(outlet) : null;
  }

  async deleteOne(id: string): Promise<void> {
    // Implement the logic to delete an outlet document from the database by ID
    await this.database.deleteOne(new ObjectId(id));
  }

  async updateOne(id: string, data: OutletRequestModel): Promise<void> {
    // Implement the logic to update an outlet document in the database by ID
    await this.database.updateOne(new ObjectId(id), data);
  }

  async findOne(query: object): Promise<OutletResponseModel | null> {
    // Implement the logic to find an outlet from the MongoDB database based on a query
    return this.database.findOne(query);
  }

  private mapToOutletResponse(outlet: any): OutletResponseModel {
    // Map the database document to the OutletResponseModel instance
    return new OutletResponseModel(
      outlet._id,
      outlet.brandName,
      outlet.email,
      outlet.phone,
      outlet.altPhone,
      outlet.address,
      outlet.city,
      outlet.state,
      outlet.country,
      outlet.pincode,
      outlet.active,
      outlet.admins
    );
  }
}
