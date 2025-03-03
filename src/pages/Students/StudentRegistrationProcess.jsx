import EnrollmentProgressbar from "../../features/students/EnrollmentProgressbar";
import StudentEnrollmentForm from "../../features/students/StudentEnrollmentForm";

const StudentRegistrationProcess = ()=>{
    return(
        <section className="w-full h-full font-mainFont1">
            <EnrollmentProgressbar/>
            <StudentEnrollmentForm/>
        </section>
    )
}

export default StudentRegistrationProcess;