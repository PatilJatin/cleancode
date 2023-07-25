import { Request, Response, NextFunction } from "express";
import {
  createOutletSchema,
  updateOutletSchema,
} from "../../validators/outlet-schema";
import { OutletRepository } from "../../../domain/adminDashboard/outlet/interfaces/repositories/outlet-repository";
import { AdminRepository } from "../../../domain/adminDashboard/admin/interfaces/repositories/admin-repository";

export async function validateCreateOutlet(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = createOutletSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateUpdateOutlet(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = updateOutletSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export const getOutletWithAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction,
  outletRepository: OutletRepository, // Add the OutletRepository here
  adminRepository: AdminRepository
) => {
  try {
    // Step 1: Retrieve the outlet ID from the request parameters
    // req.params.id contains the outlet ID
    const outletId = req.params.id;

    // Step 2: Get the outlet from the outlet repository by ID
    const outlet = await outletRepository.getOutletById(outletId);

    // Step 3: Check if the outlet exists
    if (!outlet) {
      // If outlet not found, return a 404 error response
      return res.status(404).json({ error: "Outlet not found" });
    }

    // Step 4: If the outlet exists, populate the admins field with the associated admins
    // Assuming your OutletResponseModel includes an array field named 'admins'
    // You need to update your OutletResponseModel interface accordingly
    // This code assumes that the admin field in the OutletResponseModel contains admin IDs

    const populatedOutlet = await populateOutletAdmins(outlet, adminRepository);

    // Step 5: Return the outlet document with associated admins as a response
    res.status(200).json(populatedOutlet);
  } catch (error) {
    // If there is an error, handle it and pass it to the error handling middleware
    next(error);
  }
};

async function populateOutletAdmins(
  outlet: any,
  adminRepository: AdminRepository
) {
  const outletWithAdmins = { ...outlet, admins: [] };

  for (const adminId of outlet.admins) {
    const admin = await adminRepository.getAdminById(adminId);
    if (admin) {
      outletWithAdmins.admins.push(admin);
    }
  }

  return outletWithAdmins;
}
