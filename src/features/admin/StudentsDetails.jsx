import { motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { useState } from "react";
import DeletePopup from "../../components/Common/DeletePopup";

const StudentDetails = ({ openModule, setOpenModule, studentData }) => {
  const [showDel, setShowDel] = useState(false);
  if (openModule.type !== "view") return null;

  const {
    id,
    name,
    profile_pic,
    email,
    gender,
    payment,
    status,
    department,
    parent_contact_no,
    address,
    DOB,
    date_of_join,
  } = studentData;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
    >
      <button
        onClick={() => setOpenModule(null)}
        className="absolute top-5 right-5 text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>
      <div className="p-5 font-mainFont1">
        <h3 className="text-2xl pb-5">Student Details</h3>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 bg-gray-100 p-5 rounded-xl">
          <img src={profile_pic} alt={name} className="rounded-xl w-full lg:w-fit" />
          <div>
            <h3 className="text-2xl">{name}</h3>
            <p className="text-sm text-gray-600">{department}</p>
          </div>
          <div>
            <h3 className="text-2xl">98.7%</h3>
            <p className="text-sm text-gray-600">Attendance Score</p>
          </div>
          <div>
            <h3 className="text-2xl">A</h3>
            <p className="text-sm text-gray-600">Grade</p>
          </div>
        </div>

        <Section title="Academic Details">
          <Detail icon={LuUser} label="Student Id" value={id} />
          <Detail icon={MdOutlineDateRange} label="Date of Join" value={date_of_join} />
          <Detail icon={LuUser} label="Payment Status" value={payment} />
          <Detail icon={LuUser} label="Student Status" value={status} />
          <Detail icon={FaRegBuilding} label="Department" value={department} />
        </Section>

        <Section title="Personal Details">
          <Detail icon={LuUser} label="Name" value={name} />
          <Detail icon={RiParentLine} label="Parents Mobile" value={parent_contact_no} />
          <Detail icon={MdOutlineMail} label="Email" value={email} />
          <Detail icon={BsGenderAmbiguous} label="Gender" value={gender} />
          <Detail icon={MdOutlineDateRange} label="Date of Birth" value={DOB} />
          <Detail icon={IoLocationOutline} label="Address" value={address} />
        </Section>

        <div className="flex gap-5">
          <button className="bg-green-500 hover:bg-green-300 px-5 py-2 text-white rounded-md">
            Edit Student
          </button>
          <button
            onClick={() => setShowDel(true)}
            className="bg-red-500 hover:bg-red-300 px-5 py-2 text-white rounded-md"
          >
            Delete Student
          </button>
        </div>
        {showDel && <DeletePopup name={name} showDel={showDel} setShowDel={setShowDel} />}
      </div>
    </motion.div>
  );
};

const Section = ({ title, children }) => (
  <div className="py-5">
    <h3 className="font-bold">{title}:</h3>
    <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>
  </div>
);

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-buttonblue text-xl">
      <Icon />
    </div>
    <div>
      <h3 className="font-semibold -mb-1">{label}</h3>
      <p className="text-[14px] text-gray-500">{value}</p>
    </div>
  </div>
);

export default StudentDetails;
