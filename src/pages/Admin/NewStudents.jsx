import { useDispatch, useSelector } from "react-redux";
import { addStudent, selectStudentDataTitle } from "../../store/adminSlices/adminStudentsSlice";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { deleteNewStudent, selectNewStudents } from "../../store/adminSlices/newStudentSlice";

const NewStudents = () => {
    const dispatch = useDispatch();
    const studentDataTitle = useSelector(selectStudentDataTitle);
    const newStudentList = useSelector(selectNewStudents);
    const addToExistingStudent = async(studentData) => {
        try{
        console.log("Adding student:", studentData);
        const { _id, ...newObj } = studentData;
        await  dispatch(addStudent(newObj)).unwrap();
        dispatch(deleteNewStudent(_id))

    }catch(error){
        console.error("Error response:", error.response);
        console.error("Error details:", error);
    }
    };
      
    return (
        <section className="bg-gray-100 p-5 font-mainFont1">
            <div className="bg-white px-3 py-5 rounded-lg">
                <div className="flex justify-between pb-5">
                    <h3 className="titleText">New Students List</h3>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-max w-full border-collapse text-left">
                        <thead>
                            <tr>
                                {studentDataTitle.map(({ id, title }) => (
                                    <th
                                        key={id}
                                        className={`${title === 'Batch' || title === 'Status' ? "hidden" : ""} border-b border-gray-300 py-4 px-2 whitespace-nowrap`}
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {newStudentList.length === 0 ? (
                                <tr>
                                    <td colSpan={studentDataTitle.length} className="text-center py-4">
                                        No new students available
                                    </td>
                                </tr>
                            ) : (
                                newStudentList.map((student) => {
                                    const { _id, studentID, fullName, email, gender, phone,  paymentTotal,payment_status } = student;
                                    const findPayStatus = payment_status ?? false;

                                    return (
                                        <tr key={_id} className="odd:bg-gray-100">
                                            <td className="py-4 px-2 whitespace-nowrap">{studentID}</td>
                                            <td className="py-4 px-2 whitespace-nowrap">{fullName}</td>
                                            <td className="py-4 px-2 whitespace-nowrap" title={email}>
                                                {email.length > 20 ? `${email.substring(0, 20)}...` : email}
                                            </td>
                                            <td className="py-4 px-2 whitespace-nowrap">
                                                <span className={`${gender.toLowerCase() === "male" ? "bg-themelightblue" : "bg-pink-600"} text-[12px] text-white px-2 py-1 rounded-md`}>
                                                    {gender}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 whitespace-nowrap">{phone}</td>
                                            <td className="py-4 px-2 whitespace-nowrap">
                                                <span className={`${findPayStatus ? "bg-green-500" : "bg-red-500"} text-[12px] text-white px-2 py-1 rounded-md`}>
                                                    {findPayStatus ? "Paid" : "Unpaid"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 whitespace-nowrap">{paymentTotal}</td>
                                            <td className="py-4 px-2 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <button className="w-fit bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300">
                                                        <FiEdit />
                                                    </button>
                                                    <button 
                                                        onClick={() => addToExistingStudent(student)}
                                                        className="w-fit bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300"
                                                    >
                                                        <MdAdd />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default NewStudents;
