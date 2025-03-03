import { useSelector } from "react-redux";
import { selectStudentSidebar, selectStudentSidebarData } from "../../store/studentSlices/studentSidebarSlice";
import { selectLogo } from "../../store/adminSlices/adminSidebarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
const StudentSideBar = () => {
    const logo = useSelector(selectLogo);
    const openSidebar = useSelector(selectStudentSidebar);
    const studentSidebarData = useSelector(selectStudentSidebarData);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    // Function to check if the current path matches a sidebar link
    const isActive = (path) => {
        // Replace dynamic segments (e.g., :userId) with a wildcard for matching
        const pathPattern = path.replace(/:\w+/g, "[^/]+");
        const regex = new RegExp(`^${pathPattern}$`);
        return regex.test(currentPath);
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
                    {studentSidebarData.map(({ id, title, to, icon }) => (
                        <div key={id} onClick={()=>{navigate(to)}} className={`${isActive(to) ? "bg-white text-themedarkblue" : "text-white"} w-full px-5 text-lg py-2 flex justify-between items-center gap-3 cursor-pointer hover:bg-white transition-colors duration-200 `}>
                            <h1 className="text-lg">{title}</h1>
                            <div className={`${isActive(to) ? "-rotate-90" : "rotate-[90]"} transition-transform duration-300 text-2xl`}><MdKeyboardArrowDown/></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentSideBar;