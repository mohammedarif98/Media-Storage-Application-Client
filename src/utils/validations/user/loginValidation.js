import * as yup from "yup";


export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim() 
    .email("Invalid email format")
    .matches(/^\S*$/, "Email cannot contain spaces") 
    .required("Email is required"),
  password: yup
    .string()
    .trim() 
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Password cannot contain spaces") 
    .required("Password is required"),
});