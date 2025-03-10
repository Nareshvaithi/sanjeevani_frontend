import { motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editStudentData } from "../../store/adminSlices/adminStudentsSlice";
import { selectSingleStudent, setSingleStudentRecord } from "../../store/formSlices/StudentDetailsSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Avatar, Box } from "@mui/material";
import InputField from "../../components/Common/InputMUI";

const EditStudentForm = ({ openModule, setOpenModule }) => {
  if (openModule !== 'edit') return null;

  const studentDetails = useSelector(selectSingleStudent);
  const dispatch = useDispatch();

  const {
    _id,
    id,
    fullName,
    gender,
    email,
    fatherName,
    batchID,
    motherName,
    residentialAddress,
    fatherPhone,
    dob,
    join_date,
    imageUrls,
    paymentTotal,
    paymentRecords,
    status,
  } = studentDetails || {};

  // Image preview state
  const [preview, setPreview] = useState(imageUrls || "");

  const formik = useFormik({
    initialValues: {
      id: id || "",
      fullName: fullName || "",
      gender: gender || "",
      email: email || "",
      fatherName: fatherName || "",
      batchID: batchID || "",
      motherName: motherName || "",
      residentialAddress: residentialAddress || "",
      fatherPhone: fatherPhone || "",
      dob: dob || "",
      join_date: join_date || "",
      imageUrls: imageUrls || "",
      paymentTotal: paymentTotal || "",
      paymentRecords: paymentRecords || "",
      status: status || "",
    },
    onSubmit: (values) => {
      console.log("Submitting Data:", values);
      values.status=values.status=="Active" ? true : false
      const updatedValues = {
        ...values,
        _id: String(studentDetails._id), 
      };

      dispatch(editStudentData(updatedValues)).unwrap();;
      setOpenModule(null);
    },
  });

  // Update formik values when studentDetails changes
  useEffect(() => {
    if (studentDetails) {
      formik.setValues({
        id: studentDetails.id || "",
        _id: studentDetails._id || "",
        fullName: studentDetails.fullName || "",
        gender: studentDetails.gender || "",
        email: studentDetails.email || "",
        fatherName: studentDetails.fatherName || "",
        batchID: studentDetails.batchID || "",
        motherName: studentDetails.motherName || "",
        residentialAddress: studentDetails.residentialAddress || "",
        fatherPhone: studentDetails.fatherPhone || "",
        dob: studentDetails.dob || "",
        join_date: studentDetails.join_date || "",
        imageUrls: studentDetails.imageUrls || "",
        paymentTotal: studentDetails.paymentTotal || "",
        paymentRecords: studentDetails.paymentRecords || "",
        status: studentDetails.status ? "Active" : "InActive" || "",
      });
      setPreview(studentDetails.imageUrls || "");
    }
  }, [studentDetails]);

  // Handle file input separately
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update Formik state
      formik.setFieldValue("imageUrls", file);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto p-5 rounded-none lg:rounded-l-xl"
    >
      <button
        onClick={() => { setOpenModule(null); dispatch(setSingleStudentRecord()); }}
        className="absolute top-5 right-5 text-3xl font-bold cursor-pointer z-10"
      >
        &times;
      </button>
      <div className="relative p-5 font-mainFont1">
        <h3 className="text-2xl pb-5">Edit Student</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-gray-100 p-5 rounded-xl flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar src={preview} sx={{ width: 100, height: 100 }} />
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </Box>
          </div>

          {/* Academic Details */}
          <div>
            <h3 className="font-bold">Academic Details :</h3>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <InputField icon={<LuUser />} label="Student ID" name="id" value={formik.values.id} onChange={formik.handleChange} disabled />
              <InputField
                icon={<MdOutlineDateRange />}
                label="Date of Join"
                name="join_date"
                type="date" // Set input type to "date"
                value={formik.values.join_date}
                onChange={formik.handleChange}
              />
              {/* <InputField icon={<LuUser />} label="Student Status" name="status" value={formik.values.status ? "active" : "inactive"} onChange={formik.handleChange} /> */}
              <InputField
                icon={<LuUser />}
                label="Student Status"
                name="status"
                value={formik.values.status }
                onChange={formik.handleChange}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "InActive", label: "InActive" },
                ]}
              />

              <InputField icon={<FaRegBuilding />} label="Batch" name="batchID" value={formik.values.batchID} onChange={formik.handleChange} />
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="font-bold">Personal Details :</h3>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <InputField icon={<LuUser />} label="Name" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
              <InputField icon={<RiParentLine />} label="Parents Mobile" name="fatherPhone" value={formik.values.fatherPhone} onChange={formik.handleChange} />
              <InputField icon={<MdOutlineMail />} label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
              <InputField icon={<BsGenderAmbiguous />} label="Gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" }
                ]}
              />
              <InputField
                icon={<MdOutlineDateRange />}
                label="Date of Birth"
                name="dob"
                type="date" // Set input type to "date"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              <InputField icon={<IoLocationOutline />} label="Address" name="residentialAddress" value={formik.values.residentialAddress} onChange={formik.handleChange} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5">
            <button type="submit" className="bg-green-500 hover:bg-white px-5 py-2 text-white border border-green-500 hover:text-green-500 rounded-md transition-all duration-300">
              Save Changes
            </button>
            <button onClick={() => {setOpenModule(null)}} className="px-5 py-2 text-themeskyblue border border-themeskyblue rounded-md hover:bg-themeskyblue hover:text-white transition-all duration-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};



export default EditStudentForm; 