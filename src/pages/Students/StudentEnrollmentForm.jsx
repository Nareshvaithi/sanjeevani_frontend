import { useFormik } from "formik";
import { studentRegistrationSchema } from "../../schema/registrationSchema";
import { format, differenceInYears, parse } from "date-fns";

const StudentEnrollmentForm = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd"); // Correct format for input type="date"

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
    },
    validationSchema: studentRegistrationSchema,
    onSubmit: (values) => {
      alert("good");

      console.log("Form Errors:", formik.errors);
      console.log("Form Data Submitted:", values);
    },
  });
console.log("Form Errors:", formik.errors);
  const lable = {
    fullName: "Full Name",
    dob: "Date of Birth",
    gender: "Gender",
    age: "Age",
    email: "Email",
    phone: "Phone",
    currentStandard: "Current Profession",
    fatherName: "Father Name",
    motherName: "Mother Name",
    fatherPhone: "Father Phone",
    residentialAddress: "Residential Address",
    profilePic: "Profile Picture (150px X 150px)",
  };

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
    <div className="min-h-screen flex items-center justify-center p-2 lg:p-5">
      <div className="bg-white shadow-xl rounded-lg p-2 lg:p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-themedarkblue text-center mb-5">
          Sanjeevani Student Registration Form
        </h2>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
          {Object.keys(formik.initialValues).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                {lable[field]}
              </label>

              {/* Render appropriate input based on field type */}
              {field === "gender" ? (
                <select
                  name={field}
                  {...formik.getFieldProps(field)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : field === "currentStandard" ? (
                <select
                  name={field}
                  {...formik.getFieldProps(field)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select Standard</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1}th Standard`}>{`${i + 1}th Standard`}</option>
                  ))}
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                  <option value="Working">Working</option>
                  <option value="Others">Others</option>
                </select>
              ) : field === "dob" ? (
                <input
                  type="date"
                  name={field}
                  value={formik.values.dob}
                  onChange={handleDobChange} // Handle DOB change
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : field === "age" ? (
                <input
                  type="text"
                  name={field}
                  value={formik.values.age}
                  readOnly
                  className="mt-1 w-full px-4 py-2 border rounded-lg cursor-not-allowed focus:ring-2 focus:ring-blue-400 outline-none"
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
              ) : (
                <input
                  type="text"
                  name={field}
                  {...formik.getFieldProps(field)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              )}

              {/* Display validation error if any */}
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-500 text-sm">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          {/* Submit button */}
          <div className="md:col-span-2 mx-auto">
            <button
              type="submit"
              className="w-full px-5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEnrollmentForm;