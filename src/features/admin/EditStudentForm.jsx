import { useState } from "react";
import { motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";

const EditStudentForm = ({ setOpenModule, studentData, onUpdate }) => {
  const [formData, setFormData] = useState({ ...studentData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setOpenModule(null);
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
            onClick={() => setOpenModule(null)}
            className="absolute top-5 right-5 text-3xl font-bold cursor-pointer z-10"
          >
            &times;
          </button>
          <div className="relative p-5 font-mainFont1">
            <h3 className="text-2xl pb-5">Edit Student</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-100 p-5 rounded-xl flex flex-col lg:flex-row items-start lg:items-center gap-5">
                <div className="rounded-xl w-full lg:w-fit">
                  <img src={formData.profile_pic} alt="Profile" className="rounded-xl w-full" />
                </div>
                <div className="">
                  <h3 className="text-2xl">{formData.name}</h3>
                  <p className="text-sm text-gray-600">{formData.department}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold">Academic Details :</h3>
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <InputField icon={<LuUser />} label="Student ID" name="id" value={formData.id} onChange={handleChange} disabled />
                  <InputField icon={<LuUser />} label="Date of Join" name="date_of_join" value={formData.date_of_join} onChange={handleChange} />
                  <InputField icon={<LuUser />} label="Payment Status" name="payment" value={formData.payment} onChange={handleChange} />
                  <InputField icon={<LuUser />} label="Student Status" name="status" value={formData.status} onChange={handleChange} />
                  <InputField icon={<FaRegBuilding />} label="Department" name="department" value={formData.department} onChange={handleChange} />
                </div>
              </div>

              <div>
                <h3 className="font-bold">Personal Details :</h3>
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <InputField icon={<LuUser />} label="Name" name="name" value={formData.name} onChange={handleChange} />
                  <InputField icon={<RiParentLine />} label="Parents Mobile" name="parent_contact_no" value={formData.parent_contact_no} onChange={handleChange} />
                  <InputField icon={<MdOutlineMail />} label="Email" name="email" value={formData.email} onChange={handleChange} />
                  <InputField icon={<BsGenderAmbiguous />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                  <InputField icon={<MdOutlineDateRange />} label="Date of Birth" name="DOB" value={formData.DOB} onChange={handleChange} />
                  <InputField icon={<IoLocationOutline />} label="Address" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              <div className="flex gap-5">
                <button onClick={() => setOpenModule({type:null})} type="submit" className="bg-green-500 hover:bg-white px-5 py-2 text-white border border-green-500 hover:text-green-500 rounded-md transition-all duration-300">
                  Save Changes
                </button>
                <button onClick={() => setOpenModule({type:null})} className="px-5 py-2 text-themeskyblue border border-themeskyblue rounded-md hover:bg-themeskyblue hover:text-white transition-all duration-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
  );
};

// Reusable InputField Component
const InputField = ({ icon, label, name, value, onChange, disabled }) => (
  <div className="flex items-start gap-3">
    <div className="text-buttonblue text-xl">{icon}</div>
    <div className="w-full">
      <h3 className="font-semibold -mb-1">{label}</h3>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 border rounded ${disabled ? "cursor-not-allowed" : ""}`}
      />
    </div>
  </div>
);

export default EditStudentForm;
