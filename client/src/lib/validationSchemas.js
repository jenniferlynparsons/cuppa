import { string, number, object } from "yup";

export const nameSchema = object({
  name: string().required()
});

export const emailSchema = object({
  email: string()
    .email()
    .required()
});

export const passwordSchema = object({
  password: string()
    .required()
    .min(6)
    .max(30)
});

export const password2Schema = object({
  password: string()
    .required()
    .min(6)
    .max(30)
});

export const brandSchema = object({
  brand: string().required()
});

export const teaTypeSchema = object({
  teaType: string().required()
});

export const servingsSchema = object({
  servings: number().required()
});

export const brewTimeMinSchema = object({
  brewTimeMin: number().required()
});

export const brewTimeSecSchema = object({
  brewTimeSec: number().required()
});

export const filterCategorySchema = object({
  filterCategory: string().required()
});

export const filterCriteriaSchema = object({
  filterCriteria: string().required() || number().required()
});
