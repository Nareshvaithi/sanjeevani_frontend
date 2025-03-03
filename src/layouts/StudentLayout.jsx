import { Outlet, useParams } from "react-router-dom";
import StudentSideBar from "../features/students/StudentSideBar";
import { useSelector } from "react-redux";
import { selectStudentSidebar } from "../store/studentSlices/studentSidebarSlice";
import StudentTopBar from "../features/students/StudentTopBar";
import { selectAllStudents } from "../store/adminSlices/adminStudentsSlice";

const StudentLayout = ()=>{
    const {userId} = useParams();
    const openSidebar = useSelector(selectStudentSidebar);
    const studentList = useSelector(selectAllStudents);
    const studentDetails = studentList.find((student)=> student.id === parseInt(userId));
    return(
        <main>
            <StudentSideBar studentDetails={studentDetails}/>
            <StudentTopBar studentDetails={studentDetails}/>
            <div className={`${openSidebar ? "pl-0 lg:pl-60" : "pl-0"} bg-gray-100 w-full transition-all duration-500 ease-in-out`}>
                <Outlet context={studentDetails}/>
            </div>
        </main>
    )
}

export default StudentLayout;