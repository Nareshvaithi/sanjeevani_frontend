import { useDispatch, useSelector } from "react-redux";
import { selectStudentSidebar, toggleStudentSidebar } from "../../store/studentSlices/studentSidebarSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBellOn } from "react-icons/ci";
import { BiFullscreen } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
const StudentTopBar = ({studentDetails})=>{
    
    const [showProfile,setShowProfile] = useState(false);
    const openSidebar = useSelector(selectStudentSidebar);
    const {fullName,imageUrls} = studentDetails;
    const dispatch = useDispatch();

    return(
        <section>
            <div className={`z-10 hidden lg:block fixed ${openSidebar ? "translate-x-60" : "translate-x-0"} top-0 w-full h-auto bg-themeyellow py-2 px-5 transition-all duration-500 flex items-center ${openSidebar ? "pr-64" : "pr-5"}`}>
                 <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div onClick={()=>{dispatch(toggleStudentSidebar())}} className="w-fit cursor-pointer text-white bg-blue-500 p-1 text-xl rounded-md">
                            <GiHamburgerMenu/>
                        </div>
                        <div>
                            <input type="search" placeholder="Search here" className="p-1 px-4 w-60 outline-none rounded-md"/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-2 rounded-full">
                                <CiBellOn/>
                            </div>
                            <div className="bg-white p-2 rounded-full">
                                <BiFullscreen/>
                            </div>
                            <div className="relative">
                                <div onClick={(()=>setShowProfile(!showProfile))} className="cursor-pointer flex items-center gap-2">
                                    <div className="w-10 rounded-full">
                                        <img src={imageUrls} alt="" className="w-full h-full object-contain rounded-full"/>
                                    </div>
                                    <div className="font-mainFont1">
                                        <h3 className="font-bold text-sm">{fullName}</h3>
                                        <p className="p-0 text-sm text-buttonblue">Student</p>
                                    </div>
                                    <div className="text-2xl text-buttonblue">
                                        <MdKeyboardArrowDown/>
                                    </div>
                                </div>
                                <div className={`p-2 absolute top-12 h-auto w-full bg-white transition-all duration-500 ${showProfile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                                    <div className="border-b border-gray-200">
                                        <div className="flex items-center gap-2 py-2">
                                            <div className="w-10 rounded-full">
                                                <img src={imageUrls} alt="" className="w-full h-full object-contain rounded-full"/>
                                            </div>
                                            <div className="font-mainFont1">
                                                <h3 className="font-bold text-sm">{fullName}</h3>
                                                <p className="p-0 text-sm text-buttonblue">Student</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-gray-200 py-2">
                                        <p>My Profile</p>
                                    </div>
                                    <div className="py-2">
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default StudentTopBar; 