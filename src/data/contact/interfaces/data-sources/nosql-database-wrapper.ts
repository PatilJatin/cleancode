//data/interfaces/data-source/database.ts
import { ObjectId } from "mongodb";

export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): void;
  deleteOne(id: ObjectId): void;
  updateOne(id: ObjectId, data: object): void;
  findOne(query: object): Promise<any | null>;
}
