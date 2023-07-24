// data/interfaces/data-sources/admin-data-source.ts
import {
  AdminRequestModel,
  AdminResponseModel,
} from "../../../../domain/admin/models/admin";

export interface AdminDataSource {
  create(admin: AdminRequestModel): Promise<void>;
  getAll(): Promise<AdminResponseModel[]>;
  deleteOne(id: String): Promise<void>; // Update the id parameter type to ObjectId
  updateOne(id: String, data: AdminRequestModel): Promise<void>;
  getOne(id: String): Promise<AdminResponseModel | null>;
  findOne(query: object): Promise<AdminResponseModel | null>;
}
