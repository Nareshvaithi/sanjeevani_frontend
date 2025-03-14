import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { RiParentLine } from "react-icons/ri";
import { MdOutlineMail, MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";
import { parse,format } from "date-fns";
import EditProfileForm from "../../features/students/EditProfileForm";
import {useDispatch, useSelector} from "react-redux"
import { selectShowEdit, setShowEdit } from "../../store/studentSlices/editStudentSlice";
import { CiEdit } from "react-icons/ci";


const StudentProfile = ()=>{
    const currentMonth = format(new Date(), "MMMM");
    const dispatch = useDispatch()
    const studentDetails = useOutletContext();
    const [formattedDob, setFormattedDob] = useState("");
    const [formattedJoinDate, setFormattedJoinDate] = useState("");
    const showEdit = useSelector(selectShowEdit);

    useEffect(() => {
        if (studentDetails.dob) setFormattedDob(format(new Date(studentDetails.dob), "dd/MM/yyyy"));
        if (studentDetails.join_date)
          setFormattedJoinDate(parseAndFormatDate(studentDetails.join_date));
      }, [studentDetails.dob, studentDetails.join_date, studentDetails.paymentRecords]);
    
      const parseAndFormatDate = (dateString) => {
      
        const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
        
       
        if (!isNaN(parsedDate)) {
          return format(parsedDate, "dd/MM/yyyy");
        }
        return "";
      };
      const paymentstatus = (payment) => {
        if (payment) {
          const getPayment = payment.filter(
            (month) => month.monthName === currentMonth
          );
          const getStatus = payment.filter(
            (status) => status.payment_status === true
          );
          return getPayment && getStatus.length != 0 ? "Paid" : "UnPaid";
        }
      };
      
    return(
        <section className="bg-gray-100 w-full h-auto">
            <div className="px-2 lg:px-5 w-full py-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-medium text-gray-600">My Profile</h2>
                    <p className="text-sm font-bold">Home / Student Profile</p>
                </div>
                <div className="pt-10">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 bg-gray-200 p-5 rounded-xl text-center">
                      <img
                          src={studentDetails?.imageUrls}
                          alt={studentDetails?.fullName}
                          className="rounded-xl w-full lg:w-fit"
                      />
                      <div>
                          <h3 className="text-2xl">{studentDetails?.studentID}</h3>
                          <p className="text-sm text-gray-600">ID</p>
                      </div>
                      <div>
                          <h3 className="text-2xl">{studentDetails?.fullName}</h3>
                          <p className="text-sm text-gray-600">Name</p>
                          {/* <p className="text-sm text-gray-600">{batchID}</p> */}
                      </div>
                      <div onClick={()=>{dispatch(setShowEdit(true))}} className="self-center lg:self-start bg-buttonblue rounded-full text-white p-2 transition-colors duration-700 hover:bg-white hover:text-buttonblue cursor-pointer text-3xl">
                          <CiEdit/>
                      </div>
                  </div>
                {/* Academic Details */}
                  <Section title="Academic Details">
                    <Detail icon={LuUser} label="Student Id" value={studentDetails.studentID} />
                    <Detail
                      icon={MdOutlineDateRange}
                      label="Date of Join"
                      value={formattedJoinDate}
                    />
                    <Detail
                      icon={LuUser}
                      label="Payment Status"
                      value={paymentstatus(studentDetails.paymentRecords)}
                    />
                    <Detail
                      icon={LuUser}
                      label="Student Status"
                      value={status ? "Active" : "InActive"}
                    />
                    <Detail icon={FaRegBuilding} label="Batch" value={studentDetails.batchID} />
                    <Detail
                      icon={FaRegBuilding}
                      label="Total Payment"
                      value={studentDetails.paymentTotal}
                    />
                  </Section>
                            {/* Personal Details */}
                  <Section title="Personal Details">
                          <Detail icon={LuUser} label="Name" value={studentDetails.fullName} />
                          <Detail icon={LuUser} label="Father Name" value={studentDetails.fatherName} />
                          <Detail icon={LuUser} label="Mother Name" value={studentDetails.motherName} />
                          <Detail
                            icon={RiParentLine}
                            label="Parents Mobile"
                            value={studentDetails.fatherPhone}
                          />
                          <Detail icon={MdOutlineMail} label="Email" value={studentDetails.email} />
                          <Detail icon={BsGenderAmbiguous} label="Gender" value={studentDetails.gender} />
                          <Detail
                            icon={MdOutlineDateRange}
                            label="Date of Birth"
                            value={formattedDob}
                          />
                          <Detail
                            icon={IoLocationOutline}
                            label="Address"
                            value={studentDetails.residentialAddress}
                          />
                  </Section>
                </div>
            </div>
            <AnimatePresence>
              {showEdit && <EditProfileForm />}
            </AnimatePresence>
        </section>
    )
}

const Section = ({ title, children }) => (
    <div className="py-5">
      <h3 className="font-bold">{title}:</h3>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {children}
      </div>
    </div>
  );
  
  const Detail = ({ icon: Icon, label, value }) => (
    <div
      className={`flex items-start gap-3 ${
        label === "Email" ? "col-span-2" : ""
      }`}
    >
      <div className="text-buttonblue text-xl">
        <Icon />
      </div>
      <div>
        <h3 className="font-semibold -mb-1">{label}</h3>
        <p className="text-[14px] text-gray-500">{value}</p>
      </div>
    </div>
  );

export default StudentProfile;