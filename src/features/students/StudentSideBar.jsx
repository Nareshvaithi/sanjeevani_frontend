import { useSelector } from "react-redux";
import { selectStudentSidebar, selectStudentSidebarData } from "../../store/studentSlices/studentSidebarSlice";
import { selectLogo } from "../../store/adminSlices/adminSidebarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { CgCalendarDates } from "react-icons/cg";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";


const StudentSideBar = () => {
    const logo = useSelector(selectLogo);
    const openSidebar = useSelector(selectStudentSidebar);
    const studentSidebarData = useSelector(selectStudentSidebarData);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;


    const isActive = (path) => {
       
        const pathPattern = path.replace(/:\w+/g, "[^/]+");
        const regex = new RegExp(`^${pathPattern}$`);
        return regex.test(currentPath);
    };
    const iconList = {
        home:<FaHome/>,
        class:<SiGoogleclassroom/>,
        attendance:<CgCalendarDates/>,
        apply_leave:<BsFillExclamationSquareFill/>,
        pay_fees:<FaHandHoldingDollar/>
    };
 

    return (
        <section>
            <div className={`hidden lg:block fixed top-0 left-0 ${openSidebar ? "w-60" : "w-0"} text-nowrap bg-themedarkblue h-screen transition-all duration-500 ease-in-out overflow-hidden font-mainFont1`}>
                <div className="flex items-center justify-between pl-5 py-3">
                    <div className="w-28">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div>
                    {studentSidebarData.map(({ id, title, to }) => (
                        <div key={id} onClick={()=>{navigate(to)}} className={`${isActive(to) ? "bg-white text-themedarkblue hover:text-themedarkblue" : "text-white hover:text-themedarkblue hover:bg-white"} hover:scale-105 w-full px-5 text-lg py-3 flex justify-between items-center gap-3 cursor-pointer transition-all duration-500 `}>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{iconList[title.toLowerCase().replaceAll(" ","_")]}</span>
                                <h2 className="text-lg">{title}</h2>
                            </div>
                            <div className={`${isActive(to) ? "-rotate-90" : "rotate-[90]"} transition-transform duration-300 text-2xl`}><MdKeyboardArrowDown/></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentSideBar;