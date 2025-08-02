import * as Yup from "yup";


export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Please enter a valid email address")
    .required("*Email is required"),
  password: Yup.string().required("*Password is required"),
});

export const signUpValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("*Please enter a valid email address")
    .required("*Email is required"),
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Please enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "*Passwords does not match")
    .required("*Passwords does not match"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Please enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "*Passwords does not match")
    .required("*Passwords does not match"),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Please enter a valid email address")
    .required("*Email is required"),
});