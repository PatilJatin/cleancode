import server from "./server";
import { MongoClient, ObjectId } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/noSql-db-wrapper/nosql-database-wrapper";
import { GetAllAdmins } from "./domain/adminDashboard/admin/use-cases/get-all-admins-use-case-impl";
import { AdminRepositoryImpl } from "./domain/adminDashboard/admin/repository/admin-repository";
import { CreateAdmin } from "./domain/adminDashboard/admin/use-cases/create-admin-use-case-impl";
import { UpdateAdmin } from "./domain/adminDashboard/admin/use-cases/update-admin-use-case-impl";
import { DeleteAdmin } from "./domain/adminDashboard/admin/use-cases/delete-admin-use-case-impl";
import { GetAdminById } from "./domain/adminDashboard/admin/use-cases/get-admin-by-id-use-case-impl";
import { MongoDBAdminDataSource } from "./data/adminDashboard/admin/data-sources/mongodb/mongodb-admin-data-source";
import { GetAllOutlets } from "./domain/adminDashboard/outlet/use-cases/get-all-outlet-use-case-impl";
import { OutletRepositoryImpl } from "./domain/adminDashboard/outlet/repository/outlet-repository";
import { CreateOutlet } from "./domain/adminDashboard/outlet/use-cases/create-outlet-use-case-impl";
import { UpdateOutlet } from "./domain/adminDashboard/outlet/use-cases/update-outlet-use-case-impl";
import { DeleteOutlet } from "./domain/adminDashboard/outlet/use-cases/delete-outlet-use-case-impl";
import { GetOutletById } from "./domain/adminDashboard/outlet/use-cases/get-outlet-id-use-case-impl";
import { MongoDBOutletDataSource } from "./data/adminDashboard/outlet/data-sources/mongodb/mongodb-outlet-data-source";
import OutletRouter from "./presentation/routers/outlet-dashboard-route"; // Import ObjectId here
import AdminRouter from "./presentation/routers/admin-dashboard-routes";

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

  const outletDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("outlets").find(query).toArray(),
    insertOne: async (doc) => {
      await db.collection("outlets").insertOne(doc);
    },
    deleteOne: async (id: ObjectId) => {
      await db.collection("outlets").deleteOne({ _id: id });
    },
    updateOne: async (id: ObjectId, data: object) => {
      await db.collection("outlets").updateOne({ _id: id }, data);
    },
    findOne: (query) => db.collection("outlets").findOne(query),
  };

  const outletRepository = new OutletRepositoryImpl(
    new MongoDBOutletDataSource(outletDatabase)
  );

  const adminRepository = new AdminRepositoryImpl(
    new MongoDBAdminDataSource(adminDatabase)
  );

  return {
    adminDataSource: new MongoDBAdminDataSource(adminDatabase),
    outletDataSource: new MongoDBOutletDataSource(outletDatabase),
    outletRepository,
    adminRepository,
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

  const outletMiddleWare = OutletRouter(
    new GetAllOutlets(new OutletRepositoryImpl(dataSources.outletDataSource)),
    new GetOutletById(new OutletRepositoryImpl(dataSources.outletDataSource)),
    new CreateOutlet(new OutletRepositoryImpl(dataSources.outletDataSource)),
    new UpdateOutlet(new OutletRepositoryImpl(dataSources.outletDataSource)),
    new DeleteOutlet(new OutletRepositoryImpl(dataSources.outletDataSource)),
    dataSources.outletRepository,
    dataSources.adminRepository
  );

  server.use("/outlet", outletMiddleWare);

  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
