import * as yup from "yup";

export const AdminRegSchema = yup.object({
    first_name: yup
        .string()
        .required("First Name is required")
        .matches(/^[A-Za-z]+$/, "First Name should contain only letters"),
    last_name: yup
        .string()
        .required("Last Name is required")
        .matches(/^[A-Za-z]+$/, "Last Name should contain only letters"),
    gender: yup
        .string()
        .required("Gender is required"),
    dob: yup
        .date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future"),
    age: yup
        .number()
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    profile_picture: yup
        .mixed()
        .required("Profile Picture is required")
        .test("fileSize", "File size is too large", (value) => {
            if (!value) return true; // Skip validation if no file is selected
            return value.size <= 5 * 1024 * 1024; // 5MB limit
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Skip validation if no file is selected
            return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }),
});