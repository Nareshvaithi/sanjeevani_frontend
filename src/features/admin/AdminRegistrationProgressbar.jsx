import { selectAdminRegProcess } from "../../store/authSlice/adminAuthSlice";
import { useSelector } from "react-redux";

const AdminRegistrationProgressbar = ()=>{
    const adminRegProcess = useSelector(selectAdminRegProcess);
    return(
        <div className="flex justify-center items-center py-5">
            <div className="w-fit h-auto flex justify-center relative">
                <div className="w-auto grid grid-cols-2 gap-5">
                    <div className="flex justify-center flex-col items-center">
                        <div className="px-3 py-1 bg-green-400 rounded-full text-xl text-white">1</div>
                        <p className="text-lg">Admin Details</p>
                    </div>
                    <div className="flex justify-center flex-col items-center">
                        <div className="px-3 py-1 bg-green-400 rounded-full text-xl text-white">2</div>
                        <p className="text-lg">User Credentials</p>
                    </div>
                </div>
                <div className="overflow-hidden absolute w-full translate-y-4 rounded-full -z-10">
                    <div className={`p-1 bg-green-400 ${adminRegProcess === 'adminDetails' ? "-translate-x-[100%]" : "" } ${adminRegProcess === 'userCredentials' ? "-translate-x-[50%]" : "" } transition-transform duration-1000`}></div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegistrationProgressbar;