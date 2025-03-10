import { useSelector } from "react-redux";
import { selectAllStudents, selectStudentDataTitle } from "../../store/adminSlices/adminStudentsSlice";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";

const NewStudents = ()=>{
    const studentDataTitle = useSelector(selectStudentDataTitle);
    const newStudentList = useSelector(selectAllStudents);
    const currentMonth = format(new Date(), 'MMMM');
    console.log(currentMonth);
    
    return(
        <section className="bg-gray-100 p-5 pt-20 font-mainFont1">
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
                            {
                                newStudentList.map((student,index)=>{
                                    const {_id,id,fullName,dob,join_date,status,gender,email,phone,paymentRecords,paymentTotal} = student;
                                    const studentStatus = status ? "Active" : "InActive";
                                    const findPayStatus = paymentRecords[0].month[0].payment_status;
                                    return <tr key={_id} className="odd:bg-gray-200">
                                        <td className="py-4 px-2 whitespace-nowrap">{id}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{fullName}</td>
                                        <td className="py-4 px-2 whitespace-nowrap" title={email}>{`${email.substring(0, 20)}...`}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">
                                        <span className={`${gender.toLowerCase() === "male" ? "bg-themelightblue" : "bg-pink-600"} text-[12px] text-white px-2 py-1 rounded-md`}>{gender}</span>
                                        </td>
                                        <td className="py-4 px-2 whitespace-nowrap">{phone}</td>
                                        <td className={`py-4 px-2 whitespace-nowrap`}>
                                            <span className={`${findPayStatus ? "bg-green-500" : "bg-red-500"} text-[12px] text-white px-2 py-1 rounded-md`}>{findPayStatus ? "Paid" : "Unpaid"}</span>
                                        </td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentTotal}</td>
                                        <td className={`py-4 px-2 whitespace-nowrap`}>
                                            <div className="w-fit bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300">
                                                <FiEdit />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default NewStudents;