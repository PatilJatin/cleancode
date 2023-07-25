import { OutletRequestModel, OutletResponseModel } from "../models/outlet";
import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { MongoDBOutletDataSource } from "../../../../data/adminDashboard/outlet/data-sources/mongodb/mongodb-outlet-data-source";

export class OutletRepositoryImpl implements OutletRepository {
  private dataSource: MongoDBOutletDataSource;

  constructor(dataSource: MongoDBOutletDataSource) {
    this.dataSource = dataSource;
  }

  async createOutlet(outlet: OutletRequestModel): Promise<void> {
    // Implement the logic to create an outlet in the data source
    await this.dataSource.create(outlet);
  }

  async deleteOutlet(id: string): Promise<void> {
    // Implement the logic to delete an outlet from the data source by ID
    await this.dataSource.deleteOne(id);
  }

  async updateOutlet(id: string, data: OutletRequestModel): Promise<void> {
    // Implement the logic to update an outlet in the data source by ID
    await this.dataSource.updateOne(id, data);
  }

  async getAllOutlets(): Promise<OutletResponseModel[]> {
    // Implement the logic to get all outlets from the data source
    return this.dataSource.getAll();
  }

  async getOutletById(id: string): Promise<OutletResponseModel | null> {
    // Implement the logic to get an outlet from the data source by ID
    return this.dataSource.getOne(id);
  }

  async getOutletByEmail(email: string): Promise<OutletResponseModel | null> {
    return this.dataSource.findOne({ email });
  }
}
