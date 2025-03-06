import { motion } from "framer-motion";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useFormik } from "formik";
import { differenceInYears, parse } from "date-fns";
import { studentRegistrationSchema } from "../../schema/registrationSchema";

const AddStudentForm = ({ setOpenModule }) => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      dob: "",
      gender: "",
      age: "",
      email: "",
      phone: "",
      currentStandard: "",
      fatherName: "",
      motherName: "",
      fatherPhone: "",
      residentialAddress: "",
      profilePic: null,
      payment_status:""
    },
    // validationSchema:studentRegistrationSchema,
    onSubmit: (values) => {
      console.log("Form Data Submitted:", values);
    //   setOpenModule({ type: null }); // Close the form after submission
    },
  });

    const calculateAge = (dob) => {
      if (!dob) return "";
      const birthDate = parse(dob, "yyyy-MM-dd", new Date());
      const age = differenceInYears(new Date(), birthDate);
      return age.toString();
    };
  
    // Handle DOB change
    const handleDobChange = (e) => {
      const dob = e.target.value;
      formik.setFieldValue("dob", dob); // Update DOB field
      formik.setFieldValue("age", calculateAge(dob)); // Calculate and update age
    };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto p-5 rounded-none lg:rounded-l-xl"
    >
      {/* Close Button */}
      <button
        onClick={() => setOpenModule({ type: null })}
        className="absolute top-5 right-5 text-3xl font-bold cursor-pointer z-10"
      >
        &times;
      </button>

      {/* Form Header */}
      <div>
        <h3 className="text-2xl pb-5">Add Student</h3>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Object.keys(formik.initialValues).map((field) => (
          <div key={field} className="w-full">
            {field === "gender" ? (
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name={field}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                )}
              </FormControl>
            ) : field === "currentStandard" ? (
              <FormControl fullWidth>
                <InputLabel>Current Standard</InputLabel>
                <Select
                  name={field}
                  value={formik.values.currentStandard}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.currentStandard && Boolean(formik.errors.currentStandard)}
                >
                  <MenuItem value="">Select Standard</MenuItem>
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={`${i + 1}th Standard`}>{`${i + 1}th Standard`}</MenuItem>
                  ))}
                  <MenuItem value="UG">UG</MenuItem>
                  <MenuItem value="PG">PG</MenuItem>
                  <MenuItem value="Working">Working</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
                {formik.touched.currentStandard && formik.errors.currentStandard && (
                  <p className="text-red-500 text-sm">{formik.errors.currentStandard}</p>
                )}
              </FormControl>
            ) : field === "dob" ? (
              <TextField
                name={field}
                label="Date of Birth"
                type="date"
                value={formik.values.dob}
                onChange={handleDobChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            ) : field === "profilePic" ? (
              <input
                type="file"
                accept="image/png,image/jpg"
                name={field}
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    formik.setFieldValue(field, event.currentTarget.files[0]);
                  }
                }}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ) : field === 'age' ? (
                <TextField
                name={field}
                label={field} // Convert camelCase to readable text
                value={formik.values.age}
                inputProps={{ readOnly: true }}
                onChange={handleDobChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                fullWidth
              />
            ) : (
              <TextField
                name={field}
                label={field.replace(/([A-Z])/g, " $1").trim()} // Convert camelCase to readable text
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                fullWidth
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex items-center gap-3">
        <button className="w-1/2 py-2 rounded-lg transition-all duration-300 text-lg bg-green-500 hover:bg-white text-white hover:text-green-500 border border-green-500">Add</button>
        <button onClick={formik.handleReset} className="w-1/2 py-2 rounded-lg transition-all duration-300 text-lg bg-white hover:bg-themeskyblue text-themeskyblue hover:text-white border border-themeskyblue">Reset</button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddStudentForm;