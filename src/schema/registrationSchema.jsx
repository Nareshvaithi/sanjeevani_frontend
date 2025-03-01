import * as Yup from "yup";

export const studentRegistrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),

  dob: Yup.date().required("Date of Birth is required"),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Invalid Gender")
    .required("Gender is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  currentStandard: Yup.string()
    .oneOf(
      [
        ...Array(12).map((_, i) => `${i + 1}th Standard`),
        "UG",
        "PG",
        "Working",
        "Others",
      ],
      "Invalid Standard"
    )
    .required("Current Standard is required"),

  fatherName: Yup.string().required("Father's Name is required"),

  fatherPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Father's phone must be 10 digits")
    .required("Father's Phone is required"),

  motherName: Yup.string().required("Mother's Name is required"),

  residentialAddress: Yup.string()
    .min(5, "Address is too short")
    .required("Residential Address is required"),

  profilePic: Yup.mixed()
    .required("Profile Picture is required")
    .test("fileType", "Only JPG or PNG files are allowed", (value) =>
      value && ["image/jpeg", "image/png"].includes(value.type)
    )
    .test("fileSize", "File size must be less than 5MB", (value) =>
      value && value.size <= 2 * 1024 * 1024 // 2MB limit
    ),
});