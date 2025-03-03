import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";

const StudentHome = ()=>{
    const {userId} = useParams();
    const studentsList = useSelector(selectAllStudents);
    const user = studentsList.find((student) => student.id === parseInt(userId));
    console.log(user);
    return(
        <section>
            {user.name}
        </section>
    )
}

export default StudentHome;