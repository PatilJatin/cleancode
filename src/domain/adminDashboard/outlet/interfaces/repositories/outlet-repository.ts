import { OutletRequestModel, OutletResponseModel } from "../../models/outlet";

export interface OutletRepository {
  createOutlet(outlet: OutletRequestModel): Promise<void>;
  deleteOutlet(id: string): Promise<void>;
  updateOutlet(id: string, data: OutletRequestModel): Promise<void>;
  getAllOutlets(): Promise<OutletResponseModel[]>;
  getOutletById(id: string): Promise<OutletResponseModel | null>;
  getOutletByEmail(email: string): Promise<OutletResponseModel | null>;
  // If needed, you can add more methods here based on your requirements
}
