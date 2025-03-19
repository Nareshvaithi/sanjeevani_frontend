import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
const ApprovePopUp = ({ setShowApprove }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="font-mainFont1 fixed inset-0 bg-black/30 flex justify-center items-center">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold">Approval Pending</h2>
                    <button onClick={()=>{setShowApprove(false);navigate('/student_registration');dispatch(setEnrollProcess('detailsForm'))}} className="text-2xl font-bold hover:text-red-500 transition">
                        &times;
                    </button>
                </div>

                {/* Message */}
                <div className="mt-4 text-gray-700">
                    <p>Your account is under review. The admin will approve your registration soon.</p>
                    <p className="mt-2">You will be notified once your account is activated.</p>
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-end">
                    <button onClick={()=>{setShowApprove(false);navigate('/student_registration');dispatch(setEnrollProcess('detailsForm'))}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApprovePopUp;
