import { Request, Response, NextFunction } from "express";
import {
  createContactSchema,
  updateContactSchema,
} from "../../../domain/contact/validators/contact-schema";

export function validateCreateContact(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateUpdateContact(
  req: Request<any, any, any, any, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
