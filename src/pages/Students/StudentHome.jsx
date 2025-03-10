import { useOutletContext } from "react-router-dom";
import QuickBox from "../../components/AdminComp/QuickBox";
import totalClass from "../../assets/images/student/total-class.png";
import grade from "../../assets/images/student/grade.png";
import attendance from "../../assets/images/student/attendance.png";
import competition from "../../assets/images/student/competition.png";
import AttendanceCalendar from "../../features/students/StudentAttendance";



const StudentHome = ()=>{
    const studentDetails = useOutletContext()
    console.log(studentDetails);
    
    return(
        <section className="bg-gray-100 w-full h-auto">
            <div className="px-2 lg:px-5 w-full py-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-medium text-gray-600">Welcome {studentDetails.fullName}!</h2>
                    <p className="text-sm font-bold">Home / Student</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-5">
                    <QuickBox title={"Total Class Attend"} icon={totalClass} count={"20/60"}/>
                    <QuickBox title={"Grade"} icon={grade} count={'A'}/>
                    <QuickBox title={"Attendance %"} icon={attendance} count={98.7}/>
                    <QuickBox title={"Competition"} icon={competition} count={5}/>
                </div>  
            </div>
            <div>
                <AttendanceCalendar/>
            </div>
        </section>
    )
}

export default StudentHome;