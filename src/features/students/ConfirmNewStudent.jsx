import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
import axios from "axios";

import ApprovePopUp from "../../components/Common/ApprovePopup";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../store/tostifySlice";
const ConfirmNewStudent = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showConfetti, setShowConfetti] = useState(false);
  const studentRecords=useSelector((state)=>state.studentRecord)
  const dispatch=useDispatch()
  const [showApprove,setShowApprove] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 500);
  }, []);
const handleSubmit= async ()=>{

      dispatch(setEnrollProcess("detailsForm"));
      dispatch(
        showToast({ message: "Email send successfully!", type: "success" })
      );
    } 
  

  return (
    <>
      <div className="flex justify-center items-center font-mainFont1 relative">
        <div className="w-96 shadow-xl py-4">
          <div className="border h-60 bg-green-800">
            <p className="flex justify-center items-center h-40 text-8xl text-white">
              <GrCheckmark />
            </p>
          </div>
          <div className="flex justify-center text-center mt-8">
            <div>
              <p className="text-3xl">Thank you for your registration</p>
              <div className="text-xl mt-4">🎉 Username and Password Created Successfully! 🎉</div>
              <div className="text-xl mt-4"></div>
              <div className=" flex justify-center">
                <button className="border px-4 py-1 bg-green-800 text-white rounded-md mt-4" onClick={()=>{handleSubmit();setShowApprove(true)}}>
                  Conform
                </button>
              </div>
            </div>
          </div>
        </div>
        {showApprove && <ApprovePopUp setShowApprove={setShowApprove}/>}
      </div>
    </>
  );
}

export default ConfirmNewStudent;
