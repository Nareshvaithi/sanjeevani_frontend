import { Outlet } from "react-router-dom";
import StudentSideBar from "../features/students/StudentSideBar";
import { useSelector } from "react-redux";
import { selectStudentSidebar } from "../store/studentSlices/studentSidebarSlice";
import StudentTopBar from "../features/students/StudentTopBar";
import { selectSingleStudent } from "../store/formSlices/StudentDetailsSlice";
import { useEffect, useState } from "react";

const StudentLayout = () => {
    const studentDetails = useSelector(selectSingleStudent);
    const openSidebar = useSelector(selectStudentSidebar);
    const [finalStudentDetails, setFinalStudentDetails] = useState({});

    useEffect(() => {
        // Log the Redux state
        console.log("Redux Student Details:", studentDetails);

        if (studentDetails && Object.keys(studentDetails).length > 0) {
            sessionStorage.setItem("studentDetails", JSON.stringify(studentDetails));
            setFinalStudentDetails(studentDetails);
        } else {
            // Retrieve from sessionStorage if Redux state is empty
            const storedDetails = JSON.parse(sessionStorage.getItem("studentDetails") || "{}");
            setFinalStudentDetails(storedDetails);
        }
    }, [studentDetails]);

    return (
        <main>
            <StudentSideBar studentDetails={finalStudentDetails} />
            <StudentTopBar studentDetails={finalStudentDetails} />
            <div className={`${openSidebar ? "pl-0 lg:pl-60" : "pl-0"} pt-16 w-full transition-all duration-500 ease-in-out font-mainFont1`}>
                <Outlet context={finalStudentDetails} />
            </div>
        </main>
    );
};

export default StudentLayout;
