import { Request, Response, NextFunction } from "express";

import {
  createAdminSchema,
  updateAdminSchema,
} from "../../../domain/admin/validators/admin-schema";



export async function validateCreateAdmin(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = createAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateUpdateAdmin(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = updateAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
