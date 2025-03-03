import { Outlet } from "react-router-dom";
import StudentSideBar from "../features/students/StudentSideBar";
import { useSelector } from "react-redux";
import { selectStudentSidebar } from "../store/studentSlices/studentSidebarSlice";

const StudentLayout = ()=>{
    const openSidebar = useSelector(selectStudentSidebar);
    return(
        <main>
            <StudentSideBar/>
            <div className={`${openSidebar ? "pl-0 lg:pl-60" : "pl-0"} bg-gray-100 w-full transition-all duration-500 ease-in-out`}>
                <Outlet/>
            </div>
        </main>
    )
}

export default StudentLayout;