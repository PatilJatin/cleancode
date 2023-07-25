  import { ObjectId } from "mongodb";

  export abstract class NoSQLDatabaseWrapper {
    abstract find(query: object): Promise<any[]>;
    abstract insertOne(doc: any): Promise<void>; // Change the return type to Promise<void>
    abstract deleteOne(id: ObjectId): Promise<void>;
    abstract updateOne(id: ObjectId, data: object): Promise<void>;
    abstract findOne(query: object): Promise<any | null>;
  }
