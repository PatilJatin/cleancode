// validation/contact-schema.ts
import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().max(5).trim().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.max": "Name should be under 5 characters",
    "any.required": "Name is required",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().required(),
});
