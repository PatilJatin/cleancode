import server from "./server";
import ContactRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from "./domain/contact/use-cases/get-all-contacts";
import { ContactRepositoryImpl } from "./domain/contact/repositories/contact-repository";
import { CreateContact } from "./domain/contact/use-cases/create-contact";
import { MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/contact/interfaces/data-sources/nosql-database-wrapper";
import { MongoDBContactDataSource } from "./data/contact/data-sources/mongodb/mongodb-contact-data-source";
import { GetAllAdmins } from "./domain/admin/use-cases/get-all-admins-use-case-impl";
import { AdminRepositoryImpl } from "./domain/admin/repositories/admin-repository";
import { CreateAdmin } from "./domain/admin/use-cases/create-admin-use-case-impl";
import { UpdateAdmin } from "./domain/admin/use-cases/update-admin-use-case-impl";
import { DeleteAdmin } from "./domain/admin/use-cases/delete-admin-use-case-impl";
import { GetAdminById } from "./domain/admin/use-cases/get-admin-by-id-use-case-impl";
import { MongoDBAdminDataSource } from "./data/admin/data-sources/mongodb/mongodb-admin-data-source";
import AdminRouter from "./presentation/routers/admin-router";
import { ObjectId } from "mongodb"; // Import ObjectId here

export async function getMongoDS() {
  const atlasConnectionString =
    "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority";

  const client: MongoClient = new MongoClient(atlasConnectionString);
  await client.connect();
  const db = client.db("ADMIN_DB");

  const contactDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
    deleteOne: (id: ObjectId) =>
      db.collection("contacts").deleteOne({ _id: id }),
    updateOne: (id: ObjectId, data: object) =>
      db.collection("contacts").updateOne({ _id: id }, data),
    findOne: (query) => db.collection("contacts").findOne(query),
  };

  const adminDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("admins").find(query).toArray(),
    insertOne: (doc) => db.collection("admins").insertOne(doc),
    deleteOne: (id: ObjectId) => db.collection("admins").deleteOne({ _id: id }),
    updateOne: (id: ObjectId, data: object) =>
      db.collection("admins").updateOne({ _id: id }, data),
    findOne: (query) => db.collection("admins").findOne(query),
  };

  return {
    contactDataSource: new MongoDBContactDataSource(contactDatabase),
    adminDataSource: new MongoDBAdminDataSource(adminDatabase),
  };
}

(async () => {
  const dataSources = await getMongoDS();

  const contactMiddleWare = ContactRouter(
    new GetAllContacts(
      new ContactRepositoryImpl(dataSources.contactDataSource)
    ),
    new CreateContact(new ContactRepositoryImpl(dataSources.contactDataSource))
  );

  const adminMiddleWare = AdminRouter(
    new GetAllAdmins(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new GetAdminById(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new CreateAdmin(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new UpdateAdmin(new AdminRepositoryImpl(dataSources.adminDataSource)),
    new DeleteAdmin(new AdminRepositoryImpl(dataSources.adminDataSource))
  );

  server.use("/contact", contactMiddleWare);
  server.use("/admin", adminMiddleWare);

  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
