import express, { Request, Response, NextFunction } from "express";
import { CreateOutletUseCase } from "../../domain/adminDashboard/outlet/interfaces/use-cases/create-outlet-use-case";
import { GetOutletsUseCase } from "../../domain/adminDashboard/outlet/interfaces/use-cases/get-all-outlets-use-case";
import { GetOutletByIdUseCase } from "../../domain/adminDashboard/outlet/interfaces/use-cases/get-outlet-id-use-case";
import { DeleteOutletUseCase } from "../../domain/adminDashboard/outlet/interfaces/use-cases/delete-outlet-use-case";
import { UpdateOutletUseCase } from "../../domain/adminDashboard/outlet/interfaces/use-cases/update-outlet-use-case";
import { OutletRepository } from "../../domain/adminDashboard/outlet/interfaces/repositories/outlet-repository";
import { AdminRepository } from "../../domain/adminDashboard/admin/interfaces/repositories/admin-repository";
import {
  validateCreateOutlet,
  validateUpdateOutlet,
  getOutletWithAdmins,
} from "../middleware/outlet/validation-middleware";

export default function OutletRouter(
  getAllOutletsUseCase: GetOutletsUseCase,
  getOutletByIdUseCase: GetOutletByIdUseCase,
  createOutletUseCase: CreateOutletUseCase,
  updateOutletUseCase: UpdateOutletUseCase,
  deleteOutletUseCase: DeleteOutletUseCase,
  outletRepository: OutletRepository, // Add the OutletRepository here
  adminRepository: AdminRepository
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const outlets = await getAllOutletsUseCase.execute();
      res.send(outlets);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      await getOutletWithAdmins(
        req,
        res,
        next,
        outletRepository, // Pass the OutletRepository instance here
        adminRepository // Pass the AdminRepository instance here
      );
    }
  );

  router.post(
    "/",
    validateCreateOutlet,
    async (req: Request, res: Response) => {
      try {
        await createOutletUseCase.execute(req.body);
        res.status(201).json({ message: "Outlet created" });
      } catch (err) {
        res.status(500).send({ message: "Error creating outlet" });
      }
    }
  );

  router.put(
    "/:id",
    validateUpdateOutlet,
    async (req: Request, res: Response) => {
      try {
        const outletId = req.params.id;
        await updateOutletUseCase.execute(outletId, req.body);
        res.json({ message: "Outlet updated" });
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  );

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const outletId = req.params.id;
      await deleteOutletUseCase.execute(outletId);
      res.json({ message: "Outlet deleted" });
    } catch (err) {
      res.status(500).send({ message: "Error deleting outlet" });
    }
  });

  return router;
}
