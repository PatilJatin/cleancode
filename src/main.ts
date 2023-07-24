import server from "./server";
import { MongoClient, ObjectId } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/noSql-db-wrapper/nosql-database-wrapper";
import { GetAllAdmins } from "./domain/adminDashboard/admin/use-cases/get-all-admins-use-case-impl";
import { AdminRepositoryImpl } from "./domain/adminDashboard/admin/repositories/admin-repository";
import { CreateAdmin } from "./domain/adminDashboard/admin/use-cases/create-admin-use-case-impl";
import { UpdateAdmin } from "./domain/adminDashboard/admin/use-cases/update-admin-use-case-impl";
import { DeleteAdmin } from "./domain/adminDashboard/admin/use-cases/delete-admin-use-case-impl";
import { GetAdminById } from "./domain/adminDashboard/admin/use-cases/get-admin-by-id-use-case-impl";
import { MongoDBAdminDataSource } from "./data/adminDashboard/admin/data-sources/mongodb/mongodb-admin-data-source";
import AdminRouter from "./presentation/routers/admin.dashboard.routes"; // Import ObjectId here

export async function getMongoDS() {
  const atlasConnectionString =
    "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority";

  const client: MongoClient = new MongoClient(atlasConnectionString);
  await client.connect();
  const db = client.db("ADMIN_DB");

 

  const adminDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("admins").find(query).toArray(),
    insertOne: async (doc) => {
      await db.collection("admins").insertOne(doc);
    },
    deleteOne: async (id: ObjectId) => {
      await db.collection("admins").deleteOne({ _id: id });
    },
    updateOne: async (id: ObjectId, data: object) => {
      await db.collection("admins").updateOne({ _id: id }, data);
    },
    findOne: (query) => db.collection("admins").findOne(query),
  };

  return {
    adminDataSource: new MongoDBAdminDataSource(adminDatabase),
  };
}

(async () => {
  const dataSources = await getMongoDS();

 

  const adminMiddleWare = AdminRouter(
    new GetAllAdmins(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new GetAdminById(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new CreateAdmin(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new UpdateAdmin(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new DeleteAdmin(new AdminRepositoryImpl(dataSources.adminDataSource))
  );

  server.use("/admin", adminMiddleWare);

  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
