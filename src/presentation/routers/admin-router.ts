import express from "express";
import { Request, Response } from "express";
import { CreateAdminUseCase } from "../../domain/admin/interfaces/use-cases/create-admin-use-case";
import { GetAllAdminsUseCase } from "../../domain/admin/interfaces/use-cases/get-all-admins-use-case";
import { GetAdminByIdUseCase } from "../../domain/admin/interfaces/use-cases/get-admin-by-id-use-case";
import { DeleteAdminUseCase } from "../../domain/admin/interfaces/use-cases/delete-admin-use-case";
import { UpdateAdminUseCase } from "../../domain/admin/interfaces/use-cases/update-admin-use-case";
import {
  validateCreateAdmin,
  validateUpdateAdmin,
} from "../middleware/admin/validation-middleware";

export default function AdminRouter(
  getAllAdminsUseCase: GetAllAdminsUseCase,
  getAdminByIdUseCase: GetAdminByIdUseCase,
  createAdminUseCase: CreateAdminUseCase,
  updateAdminUseCase: UpdateAdminUseCase,
  deleteAdminUseCase: DeleteAdminUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const admins = await getAllAdminsUseCase.execute();
      res.send(admins);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const adminId = req.params.id;
      const admin = await getAdminByIdUseCase.execute(adminId);
      if (admin) {
        res.send(admin);
      } else {
        res.status(404).send({ message: "Admin not found" });
      }
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", validateCreateAdmin, async (req: Request, res: Response) => {
    try {
      await createAdminUseCase.execute(req.body);
      res.status(201).json({ message: "Admin created" });
    } catch (err) {
      res.status(500).send({ message: "Error creating admin" });
    }
  });

  router.put(
    "/:id",
    validateUpdateAdmin,
    async (req: Request, res: Response) => {
      try {
        const adminId = req.params.id;
        await updateAdminUseCase.execute(adminId, req.body);
        res.json({ message: "Admin updated" });
      } catch (err) {
        res.status(500).send({ message: "Error updating admin" });
      }
    }
  );

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const adminId = req.params.id;
      await deleteAdminUseCase.execute(adminId);
      res.json({ message: "Admin deleted" });
    } catch (err) {
      res.status(500).send({ message: "Error deleting admin" });
    }
  });

  return router;
}
