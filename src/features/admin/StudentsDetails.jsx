import { motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { useState } from "react";
import DeletePopup from "../../components/Common/DeletePopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useContext } from "react";
import { ContextProvide } from "../../Context";
import {
  selectAllStudents,
  selectStudentDataTitle,
  selectSortField,
  selectSortOrder,
  sortStudents,
  fetchStudentsRecord,
} from "../../store/adminSlices/adminStudentsSlice";
const StudentDetails = ({ openModule, setOpenModule, studentData }) => {
  
  const {month,setMonth}=useContext(ContextProvide);
  const dispatch=useDispatch()
  const singleRecord=useSelector((state)=>state.singleStudentRecord.singleStudentDetails)
  console.log("singleRecord",singleRecord)
  useEffect(() => {
      dispatch(fetchStudentsRecord());
    }, [dispatch]);
  const [showDel, setShowDel] = useState(false);
  if (openModule.type !== "view") return null;
  const studentList = useSelector(selectAllStudents);
  const {
    fullName,
    _id,
    status,
    dob,
    age,
    gender,
    email,
    curent_proffession,
    fatherName,
    motherName,
    fatherPhone,
    personal_conductMOB,

    paid_date,
    join_date,
    batchID,
    password,
    conform_password,
    student_info,
    payment_status,
    received_payment,
    paymentTotal,
    paidMonthCount,
    paymentPerMonthTotal,
    paymentCount,
    paymentDue,
    DueMonthCount,
    attentance,
    imageUrls,
    residentialAddress
  } = singleRecord;
let paidstatus

    singleRecord.paymentRecords.map((data)=>{
      data.month.map((value)=>{
        if(month==value.monthName){
          paidstatus=value.payment_status
          console.log(paidstatus)
        }
      })
    })

    const date = new Date("2025-05-03T04:00:00.000Z");
    const formattedDate = date.toISOString().split("T")[0]; 

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
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 bg-gray-100 p-5 rounded-xl text-center">
          <img src={imageUrls} alt={fullName} className="rounded-xl w-full lg:w-fit" />
          <div>
            <h3 className="text-2xl">{fullName}</h3>
            <p className="text-sm text-gray-600">{batchID}</p>
          </div>
          <div>
            <h3 className="text-2xl">98.7%</h3>
            <p className="text-sm text-gray-600">Attendance Score</p>
          </div>
        
        </div>


        <Section title="Academic Details">
          <Detail icon={LuUser} label="Student Id" value={_id} />
          <Detail icon={MdOutlineDateRange} label="Date of Join" value={join_date} />
          <Detail icon={LuUser} label="Payment Status" value={paidstatus ? "paid" : "unpaid"} />
          <Detail icon={LuUser} label="Payment Total" value={paymentTotal} />
          <Detail icon={LuUser} label="Student Status" value={status ? "active" : "inactive"} />
          <Detail icon={FaRegBuilding} label="Batch" value={batchID} />
        </Section>

        <Section title="Personal Details">
          <Detail icon={LuUser} label="Name" value={fullName} />
          <Detail icon={RiParentLine} label="Parents Mobile" value={fatherPhone} />
          <Detail icon={MdOutlineMail} label="Email" value={email} />
          <Detail icon={BsGenderAmbiguous} label="Gender" value={gender} />
          <Detail icon={MdOutlineDateRange} label="Date of Birth" value={dob} />
          <Detail icon={IoLocationOutline} label="Address" value={residentialAddress} />
        </Section>

        <div className="flex gap-5">
          <button onClick={()=>{setOpenModule({type:'edit',data:studentData})}} className="bg-green-500 hover:bg-white px-5 py-2 text-white border border-green-500 hover:text-green-500 rounded-md transition-all duration-300">
            Edit
          </button>
          <button
            onClick={() => setShowDel(true)}
            className="bg-red-500 hover:bg-white px-5 py-2 text-white border border-red-500 hover:text-red-500 rounded-md transition-all duration-300"
          >
            Delete
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
