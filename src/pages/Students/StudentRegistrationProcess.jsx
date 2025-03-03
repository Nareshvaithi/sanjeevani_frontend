import { useSelector } from "react-redux";
import CreateStudentCredentials from "../../features/students/CreateStudentCredential";
import EnrollmentProgressbar from "../../features/students/EnrollmentProgressbar";
import StudentEnrollmentForm from "../../features/students/StudentEnrollmentForm";
import { selectEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
import ConfirmNewStudent from "../../features/students/ConfirmNewStudent";

const StudentRegistrationProcess = ()=>{
    const enrollProcess = useSelector(selectEnrollProcess);
    return(
        <section className="w-full h-full font-mainFont1">
            <EnrollmentProgressbar/>
            {enrollProcess === 'detailsForm' && <StudentEnrollmentForm/>}
            {enrollProcess === 'userCredential' && <CreateStudentCredentials/>}
            {enrollProcess === 'confirm' && <ConfirmNewStudent/>}
        </section>
    )
}

export default StudentRegistrationProcess;