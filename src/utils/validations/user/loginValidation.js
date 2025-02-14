import * as yup from "yup";



export const registerSchema = yup.object().shape({
  username: yup.string()
    .required("Username is required")
    .matches(/^\S*$/, "Username cannot contain spaces"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});