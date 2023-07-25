import Joi from "joi";

// Schema for validating request data when creating a new outlet
export const createOutletSchema = Joi.object({
  brandName: Joi.string().required().max(30).trim().messages({
    "string.base": "Brand name must be a string.",
    "string.empty": "Brand name is required.",
    "string.max": "Brand name should be under 30 characters.",
  }),
  email: Joi.string().required().email().trim().lowercase().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.string().required().length(10).pattern(/^\d+$/).messages({
    "string.base": "Phone number must be a string.",
    "string.empty": "Phone number is required.",
    "string.length": "Phone number should be 10 digits.",
    "string.pattern.base": "Phone number should contain only digits.",
  }),
  altPhone: Joi.string().length(10).pattern(/^\d+$/).messages({
    "string.base": "Alternate phone number must be a string.",
    "string.length": "Alternate phone number should be 10 digits.",
    "string.pattern.base": "Alternate phone number should contain only digits.",
  }),
  address: Joi.string().required().max(120).messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address is required.",
    "string.max": "Address should be under 120 characters.",
  }),
  city: Joi.string().required().max(30).messages({
    "string.base": "City must be a string.",
    "string.empty": "City is required.",
    "string.max": "City name should be under 30 characters.",
  }),
  state: Joi.string().required().max(30).messages({
    "string.base": "State must be a string.",
    "string.empty": "State is required.",
    "string.max": "State name should be under 30 characters.",
  }),
  country: Joi.string().required().max(20).messages({
    "string.base": "Country must be a string.",
    "string.empty": "Country is required.",
    "string.max": "Country name should be under 20 characters.",
  }),
  pincode: Joi.number().required().integer().positive().max(999999).messages({
    "number.base": "Pincode must be a number.",
    "number.empty": "Pincode is required.",
    "number.integer": "Pincode must be an integer.",
    "number.positive": "Pincode must be a positive number.",
    "number.max": "Pincode should be under 6 digits.",
  }),
  admins: Joi.array().items(Joi.string()).messages({
    "array.base": "Admins must be an array.",
  }),
});

// Schema for validating request data when updating an existing outlet
export const updateOutletSchema = Joi.object({
  brandName: Joi.string().required().max(30).trim().messages({
    "string.base": "Brand name must be a string.",
    "string.empty": "Brand name is required.",
    "string.max": "Brand name should be under 30 characters.",
  }),
  email: Joi.string().email().trim().lowercase().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.string().length(10).pattern(/^\d+$/).messages({
    "string.base": "Phone number must be a string.",
    "string.length": "Phone number should be 10 digits.",
    "string.pattern.base": "Phone number should contain only digits.",
  }),
  altPhone: Joi.string().length(10).pattern(/^\d+$/).messages({
    "string.base": "Alternate phone number must be a string.",
    "string.length": "Alternate phone number should be 10 digits.",
    "string.pattern.base": "Alternate phone number should contain only digits.",
  }),
  address: Joi.string().required().max(120).messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address is required.",
    "string.max": "Address should be under 120 characters.",
  }),
  city: Joi.string().required().max(30).messages({
    "string.base": "City must be a string.",
    "string.empty": "City is required.",
    "string.max": "City name should be under 30 characters.",
  }),
  state: Joi.string().required().max(30).messages({
    "string.base": "State must be a string.",
    "string.empty": "State is required.",
    "string.max": "State name should be under 30 characters.",
  }),
  country: Joi.string().required().max(20).messages({
    "string.base": "Country must be a string.",
    "string.empty": "Country is required.",
    "string.max": "Country name should be under 20 characters.",
  }),
  pincode: Joi.number().integer().positive().max(999999).messages({
    "number.base": "Pincode must be a number.",
    "number.integer": "Pincode must be an integer.",
    "number.positive": "Pincode must be a positive number.",
    "number.max": "Pincode should be under 6 digits.",
  }),
  admins: Joi.array().items(Joi.string()).messages({
    "array.base": "Admins must be an array.",
  }),
});
