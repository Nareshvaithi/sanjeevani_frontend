import { useSelector } from "react-redux";
import { selectStudentSidebar } from "../../store/studentSlices/studentSidebarSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBellOn } from "react-icons/ci";
import { BiFullscreen } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
const StudentTopBar = ()=>{
    const openSidebar = useSelector(selectStudentSidebar);
    return(
        <section>
            <div className={`hidden lg:block fixed ${openSidebar ? "translate-x-60" : "translate-x-0"} top-0 w-full h-auto bg-themeyellow py-2 px-5 transition-all duration-500 flex items-center ${openSidebar ? "pr-64" : "pr-5"}`}>
                 <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-fit cursor-pointer text-white bg-blue-500 p-1 text-xl rounded-md">
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
                            <div className="">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white p-2 rounded-2xl">
                                        <FaRegUserCircle/>
                                    </div>
                                    <div className="font-mainFont1">
                                        <h3 className="font-bold text-sm">{""}</h3>
                                        <p className="p-0 text-sm text-buttonblue">Administrator</p>
                                    </div>
                                    <div className="text-2xl text-buttonblue">
                                        <MdKeyboardArrowDown/>
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