import { motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../components/Common/DeletePopup";
import { format } from "date-fns";
import detailsDownload from "../../utils/studentDetailDownload";
import { selectSingleStudent, setSingleStudentRecord } from "../../store/formSlices/StudentDetailsSlice";

const StudentDetails = ({ openModule, setOpenModule }) => {
  const [showDel, setShowDel] = useState(false);
  const [formattedJoinDate, setFormattedJoinDate] = useState("");
  const [formattedDob, setFormattedDob] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const dispatch = useDispatch();

  if (openModule !== "view") return null;

  const studentDetails = useSelector(selectSingleStudent);

  const {
    _id,
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


  useEffect(() => {
    if (dob) setFormattedDob(format(new Date(dob), "dd/MM/yyyy"));
    if (join_date) setFormattedJoinDate(format(new Date(join_date), "dd/MM/yyyy"));

    if (paymentRecords && paymentRecords.length > 0) {
      setPaymentStatus(paymentRecords[0]?.month[0]?.payment_status ? "Paid" : "UnPaid");
    }
  }, [dob, join_date, paymentRecords]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
    >
      <button
        onClick={() => {
          setOpenModule(null);
          dispatch(setSingleStudentRecord(null));
        }}
        className="absolute top-5 right-5 text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <div id="student-details" className="p-5 font-mainFont1">
        <h3 className="text-2xl pb-5">Student Details</h3>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 bg-gray-100 p-5 rounded-xl text-center">
          <img src={imageUrls} alt={fullName} className="rounded-xl w-full lg:w-fit" />
          <div>
            <h3 className="text-2xl">{"0001"}</h3>
            <p className="text-sm text-gray-600">ID</p>
          </div>
          <div>
            <h3 className="text-2xl">{fullName}</h3>
            <p className="text-sm text-gray-600">Dance</p>
          </div>
          <div>
            <h3 className="text-2xl">98.7%</h3>
            <p className="text-sm text-gray-600">Attendance</p>
          </div>
        </div>

        {/* Academic Details */}
        <Section title="Academic Details">
          <Detail icon={LuUser} label="Student Id" value={_id} />
          <Detail icon={MdOutlineDateRange} label="Date of Join" value={formattedJoinDate} />
          <Detail icon={LuUser} label="Payment Status" value={paymentStatus} />
          <Detail icon={LuUser} label="Student Status" value={status} />
          <Detail icon={FaRegBuilding} label="Batch" value={batchID} />
          <Detail icon={FaRegBuilding} label="Total Payment" value={paymentTotal} />
        </Section>

        {/* Personal Details */}
        <Section title="Personal Details">
          <Detail icon={LuUser} label="Name" value={fullName} />
          <Detail icon={LuUser} label="Father Name" value={fatherName} />
          <Detail icon={LuUser} label="Mother Name" value={motherName} />
          <Detail icon={RiParentLine} label="Parents Mobile" value={fatherPhone} />
          <Detail icon={MdOutlineMail} label="Email" value={email} />
          <Detail icon={BsGenderAmbiguous} label="Gender" value={gender} />
          <Detail icon={MdOutlineDateRange} label="Date of Birth" value={formattedDob} />
          <Detail icon={IoLocationOutline} label="Address" value={residentialAddress} />
        </Section>

        {/* Buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => setOpenModule("edit")}
            className="bg-green-500 hover:bg-white px-5 py-2 text-white border border-green-500 hover:text-green-500 rounded-md transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDel(true)}
            className="bg-red-500 hover:bg-white px-5 py-2 text-white border border-red-500 hover:text-red-500 rounded-md transition-all duration-300"
          >
            Delete
          </button>
          <button
            onClick={() => detailsDownload(fullName, imageUrls)}
            className="bg-themeyellow hover:bg-white px-5 py-2 text-white border border-themeyellow hover:text-themeyellow rounded-md transition-all duration-300"
          >
            Download
          </button>
        </div>

        {/* Delete Popup */}
        {showDel && <DeletePopup name={fullName} showDel={showDel} setShowDel={setShowDel} />}
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
  <div className={`flex items-start gap-3 ${label === "Email" ? "col-span-2" : ""}`}>
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
