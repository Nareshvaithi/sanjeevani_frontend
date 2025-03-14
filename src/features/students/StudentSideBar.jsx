import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectStudentSidebar, selectStudentSidebarData, setStudentSidebar } from "../../store/studentSlices/studentSidebarSlice";
import { selectLogo } from "../../store/adminSlices/adminSidebarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";


const StudentSideBar = ({studentDetails}) => {
    const userId = studentDetails._id;
    const logo = useSelector(selectLogo);
    const openSidebar = useSelector(selectStudentSidebar);
    const studentSidebarData = useSelector(selectStudentSidebarData);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    const isActive = (path) => {
       
        const pathPattern = path.replace(/:\w+/g, "[^/]+");
        const regex = new RegExp(`^${pathPattern}$`);
        return regex.test(currentPath);
    };
    const iconList = {
        home:<FaHome/>,
        my_profile:<MdAccountCircle/>,
        apply_leave:<BsFillExclamationSquareFill/>,
        pay_fees:<FaHandHoldingDollar/>,
        events:<RiCalendarEventLine />
    };
 
useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        dispatch(setStudentSidebar(false));
      } else {
        dispatch(setStudentSidebar(true));
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
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
                        <div key={id} onClick={()=>{navigate(to.replace(':userId',userId))}} className={`${isActive(to) ? "bg-white text-themedarkblue hover:text-themedarkblue" : "text-white hover:text-themedarkblue hover:bg-white"} hover:scale-105 w-full px-5 text-lg py-3 flex justify-between items-center gap-3 cursor-pointer transition-all duration-500 `}>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{iconList[title.toLowerCase().replaceAll(" ","_")]}</span>
                                <h2 className="text-lg">{title}</h2>
                            </div>
                            <div className={`${isActive(to) ? "-rotate-90" : "rotate-[90]"} transition-transform duration-300 text-2xl`}><MdKeyboardArrowDown/></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`block lg:hidden z-50 fixed overflow-hidden top-[63px] w-screen h-screen ${openSidebar ? "translate-x-0" : "-translate-x-[100%]"} transition-transform duration-700`}>
                <div className={`w-3/4 h-full bg-themedarkblue transition-all duration-700 ease-in-out`}>
                <div className="flex items-center justify-between pl-5 py-3">
                    <div className="w-28">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div>
                    {studentSidebarData.map(({ id, title, to }) => (
                        <div key={id} onClick={()=>{navigate(to.replace(':userId',userId));dispatch(setStudentSidebar(false));window.scrollTo(0,0)}} className={`${isActive(to) ? "bg-white text-themedarkblue hover:text-themedarkblue" : "text-white hover:text-themedarkblue hover:bg-white"} hover:scale-105 w-full px-5 text-lg py-3 flex justify-between items-center gap-3 cursor-pointer transition-all duration-500 `}>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{iconList[title.toLowerCase().replaceAll(" ","_")]}</span>
                                <h2 className="text-lg">{title}</h2>
                            </div>
                            <div className={`${isActive(to) ? "-rotate-90" : "rotate-[90]"} transition-transform duration-300 text-2xl`}><MdKeyboardArrowDown/></div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
    );
};

export default StudentSideBar;