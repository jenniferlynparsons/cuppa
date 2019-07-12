import { string, object } from "yup";

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
