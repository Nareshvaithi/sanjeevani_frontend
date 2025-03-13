import { useFormik } from "formik";
import { studentRegistrationSchema } from "../../schema/registrationSchema";
import { format, differenceInYears, parse } from "date-fns";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addStudentRecord } from "../../store/formSlices/RegisterFormSlice";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectEnrollProcess, setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";

const StudentEnrollmentForm = () => {
  const [order,setOrder]=useState({})
const studentRecords=useSelector((state)=>state.studentRecord)
const API_URL = import.meta.env.VITE_API_URL;
  const dispatch=useDispatch()
  console.log("studentRecords",studentRecords)
  const currentDate = format(new Date(), "yyyy-MM-dd"); 
  const [data, setData] = useState([]);
const { error, isLoading, Razorpay } = useRazorpay();
useEffect( ()=>{
  const fetdata=async ()=>{
    const response=await axios.get(`${API_URL}/payments/paymentsall`)
    setData(response.data)   
  }
  fetdata()
},[])
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
      image: null,
    },
    validationSchema: studentRegistrationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      

       try{
let id
        if(values.age>18){
          data.map((value)=>{
            if(value.plan=="Adult")
            id=value._id
          })
        }else{
          data.map((value)=>{
            if(value.plan=="Child")
            id=value._id
          })

        }
      if (!id) throw new Error("Payment plan not found");
        const response=await axios.get(`${API_URL}/payments?_id=${id}`,)
        const orderDetails={received_payment:response.data.amount,paymentOderID:response.data.id}
       
    
        const  handler= (response) => {
          const formDataObject = Object.fromEntries(formData.entries());
          formik.setValues({
            ...values,
            ...orderDetails,
            paymentId: response.razorpay_payment_id,
            
          });
          dispatch(setEnrollProcess("payment"))
      
         dispatch(addStudentRecord({ ...formDataObject, ...orderDetails, paymentId: response.razorpay_payment_id }))
        }
        const razorpayInstance = new Razorpay({...response.data,key:"rzp_test_Rk1g9fTmim96jn",handler});
        console.log("razorpayInstance",razorpayInstance.options.amount)
        razorpayInstance.open();
      
      }catch(error){
        console.log(error.response)
        console.log(error)
        alert("fail")
      }
     
      console.log("Form Errors:", formik.errors);
      console.log("Form Data Submitted:", values);
  
    },
  });
  console.log(formik.errors)
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
    image: "Profile Picture (150px X 150px)",
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
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-2 lg:p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-themedarkblue text-center mb-5">
          Sanjeevani Student Registration Form
        </h2>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
          {Object.keys(formik.initialValues).map((field) => (
            <div key={field} className="flex flex-col">
              {/* Render appropriate input based on field type */}
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
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i + 1} value={`${i + 1}th Standard`}>{`${i + 1}th Standard`}</MenuItem>
                    ))}
                    <MenuItem value="UG">UG</MenuItem>
                    <MenuItem value="PG">PG</MenuItem>
                    <MenuItem value="Working">Working</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
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
              ) : field === "age" ? (
                <TextField
                  name={field}
                  label="Age"
                  value={formik.values.age}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              ) : field === "image" ? (
                <input
                  type="file"
                  accept="image/png,image/jpg"
                  name={field}
                  onChange={(event) => {
                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                      formik.setFieldValue(field, event.currentTarget.files[0]);
                    }
                  }}
                  className="mt-1 w-full px-4 py-3 border border-gray-400/70 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <TextField
                  name={field}
                  label={lable[field]}
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