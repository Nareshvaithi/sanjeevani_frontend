import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../store/tostifySlice";
const ConfirmNewStudent = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [showConfetti, setShowConfetti] = useState(false);
  const studentRecords = useSelector((state) => state.studentRecord);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 500);
  }, []);
  const hanldelSubmit = async () => {
    try {
      const updateRecords = await axios.post(
        `${API_URL}/student/entroll`,
        studentRecords,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setEnrollProcess("detailsForm"));
      dispatch(
        showToast({ message: "Email send successfully!", type: "success" })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-96 shadow-xl py-4">
          <div className="border h-60 bg-green-800">
            <p className="flex justify-center items-center h-40 text-8xl text-white">
              <GrCheckmark />
            </p>
          </div>
          <div className="flex justify-center text-center mt-8">
            <div>
              <p className="text-3xl">Thank you for your registration</p>
              <div className="text-xl mt-4">
                🎉 Username and Password Created Successfully! 🎉
              </div>
              <div className="text-xl mt-4">
                🎉 We’ve sent you a confirmation email. Please check your inbox!
                📧 🎉
              </div>
              <div className=" flex justify-center">
                <button
                  className="border px-4 py-1 bg-green-800 text-white rounded-md mt-4"
                  onClick={() => {
                    hanldelSubmit();
                    navigate("/");
                  }}
                >
                  Conform
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmNewStudent;
