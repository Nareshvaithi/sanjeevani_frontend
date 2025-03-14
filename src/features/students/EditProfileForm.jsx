import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { editStudentData } from "../../store/adminSlices/adminStudentsSlice";
import { setSingleStudentRecord } from "../../store/formSlices/StudentDetailsSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Avatar, Box } from "@mui/material";
import InputField from "../../components/Common/InputMUI";
import { selectShowEdit, setShowEdit } from "../../store/studentSlices/editStudentSlice";
import { useOutletContext } from "react-router-dom";

const EditProfileForm = () => {
  const showEdit = useSelector(selectShowEdit);
  const studentDetails = useOutletContext();
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(studentDetails?.imageUrls || "");

  const formik = useFormik({
    initialValues: {
      fullName: studentDetails?.fullName || "",
      gender: studentDetails?.gender || "",
      email: studentDetails?.email || "",
      fatherName: studentDetails?.fatherName || "",
      motherName: studentDetails?.motherName || "",
      residentialAddress: studentDetails?.residentialAddress || "",
      fatherPhone: studentDetails?.fatherPhone || "",
      dob: studentDetails?.dob || "",
      image: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("_id", studentDetails?._id);      
      console.log(studentDetails._id);

      Object.keys(values).forEach((key) => {
        if (key !== "image") {
          formData.append(key, values[key]);
        }
      });

      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        await dispatch(editStudentData(formData)).unwrap();
        dispatch(setShowEdit(false));
      } catch (error) {
        console.error("Edit error:", error);
      }
    },
  });

  useEffect(() => {
    if (studentDetails && Object.keys(studentDetails).length > 0) {
      formik.setValues({
        fullName: studentDetails.fullName || "",
        gender: studentDetails.gender || "",
        email: studentDetails.email || "",
        fatherName: studentDetails.fatherName || "",
        motherName: studentDetails.motherName || "",
        residentialAddress: studentDetails.residentialAddress || "",
        fatherPhone: studentDetails.fatherPhone || "",
        dob: studentDetails.dob || "",
        image: "",
      });
      setPreview(studentDetails.imageUrls || "");
    }
  }, [studentDetails]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!showEdit) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto p-5 rounded-none lg:rounded-l-xl"
    >
      <button
        onClick={() => {
          dispatch(setShowEdit(false));
          dispatch(setSingleStudentRecord());
        }}
        className="absolute top-5 right-5 text-3xl font-bold cursor-pointer z-10"
      >
        &times;
      </button>

      <div className="relative p-5 font-mainFont1">
        <h3 className="text-2xl pb-5">Edit Profile</h3>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar src={preview} sx={{ width: 100, height: 100 }} />
            <input
              accept="image/*"
              type="file"
              name="image"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span"> Upload Image </Button>
            </label>
          </Box>

          {/* Personal Details */}
          <div>
            <h3 className="font-bold">Personal Details :</h3>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <InputField label="Full Name" name="fullName" value={formik.values.fullName} onChange={formik.handleChange}/>
              <InputField label="Father's Name" name="fatherName" value={formik.values.fatherName} onChange={formik.handleChange} />
              <InputField label="Mother's Name" name="motherName" value={formik.values.motherName} onChange={formik.handleChange} />
              <InputField label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
              <InputField label="Phone" name="fatherPhone" value={formik.values.fatherPhone} onChange={formik.handleChange} />
              <InputField label="Date of Birth" name="dob" type="date" value={formik.values.dob} onChange={formik.handleChange} />
              <InputField label="Gender" name="gender" value={formik.values.gender} onChange={formik.handleChange} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]} />
              <InputField label="Residential Address" name="residentialAddress" value={formik.values.residentialAddress} onChange={formik.handleChange} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5">
            <button type="submit" className="bg-green-500 hover:bg-white px-5 py-2 text-white border border-green-500 hover:text-green-500 rounded-md transition-all duration-300">
              Save Changes
            </button>
            <button onClick={() => dispatch(setShowEdit(false))} className="px-5 py-2 text-themeskyblue border border-themeskyblue rounded-md hover:bg-themeskyblue hover:text-white transition-all duration-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProfileForm;
