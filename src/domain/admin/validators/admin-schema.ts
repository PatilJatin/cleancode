import Joi from "joi";

// Schema for validating request data when creating a new admin
export const createAdminSchema = Joi.object({
  name: Joi.string().required().max(53).trim().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.max": "Name should be under 53 characters.",
  }),
  email: Joi.string().required().email().trim().lowercase().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.number().required().max(9999999999999).messages({
    "number.base": "Phone number must be a number.",
    "number.empty": "Phone number is required.",
    "number.max": "Phone number should be under 13 digits.",
  }),
  brand: Joi.string().max(30).trim().messages({
    "string.base": "Brand must be a string.",
    "string.max": "Brand name should be under 30 characters.",
  }),
  jobTitle: Joi.string().max(30).trim().messages({
    "string.base": "Job title must be a string.",
    "string.max": "Job title should be under 30 characters.",
  }),
  superAdmin: Joi.boolean(),
  admin: Joi.boolean(),
  permissions: Joi.array().items(Joi.number().integer()).messages({
    "array.base": "Permissions must be an array.",
    "array.items": "Permissions must contain only integers.",
  }),
  active: Joi.boolean(),
  outlet: Joi.string(),
});

// Schema for validating request data when updating an existing admin
export const updateAdminSchema = Joi.object({
  name: Joi.string().required().max(53).trim().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.max": "Name should be under 53 characters.",
  }),
  email: Joi.string().email().trim().lowercase().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.number().max(9999999999999).messages({
    "number.base": "Phone number must be a number.",
    "number.max": "Phone number should be under 13 digits.",
  }),
  brand: Joi.string().max(30).trim().messages({
    "string.base": "Brand must be a string.",
    "string.max": "Brand name should be under 30 characters.",
  }),
  jobTitle: Joi.string().max(30).trim().messages({
    "string.base": "Job title must be a string.",
    "string.max": "Job title should be under 30 characters.",
  }),
  superAdmin: Joi.boolean(),
  admin: Joi.boolean(),
  permissions: Joi.array().items(Joi.number().integer()).messages({
    "array.base": "Permissions must be an array.",
    "array.items": "Permissions must contain only integers.",
  }),
  active: Joi.boolean(),
  outlet: Joi.string(),
});
