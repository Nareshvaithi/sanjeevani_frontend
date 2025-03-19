import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectBreadCrumb } from "../../store/adminSlices/adminSidebarSlice";
import Breadcrumb from "../../components/Common/BreadCrumb";
import { FaDownload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { selectFeesListField, selectOpenModuleOfFees, setOpenModuleFees } from "../../store/adminSlices/feesSlice";
import AddFees from "../../features/admin/AddFees";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";
import { FiEdit } from "react-icons/fi";
import EditFees from "../../features/admin/EditFees";
import { differenceInMonths, format, parse } from "date-fns";

const AdminFeesList = () => {
    const studentList = useSelector(selectAllStudents);
    const openFeesModule = useSelector(selectOpenModuleOfFees);
    const dispatch = useDispatch();
    const breadcrumbItems = useSelector(selectBreadCrumb).map((item) => ({
        label: item,
        link: null,
    }));

    // Initial search state
    const initialSearchState = { id: "", name: "", batch: "", invoice: "" };
    const [searchQuery, setSearchQuery] = useState(initialSearchState);

    const feesListFields = useSelector(selectFeesListField);

    // Handle search input change
    const handleSearchChange = (e, field) => {
        setSearchQuery((prev) => ({
            ...prev,
            [field]: e.target.value.toLowerCase(),
        }));
    };

    // Filter student list based on search query
    let filteredStudentList
    console.log("studentList",studentList)
    if(studentList){
        filteredStudentList = studentList.filter((student) => {
            return (
                (searchQuery.id === "" || student.studentID?.toLowerCase().includes(searchQuery.id)) &&
                (searchQuery.name === "" || student.fullName?.toLowerCase().includes(searchQuery.name)) &&
                (searchQuery.batch === "" || (student.batchID && student.batchID.toLowerCase().includes(searchQuery.batch))) &&
                (searchQuery.invoice === "" || student.paymentRecords.some((payment) =>
                    payment.invoiceNumber?.toLowerCase().includes(searchQuery.invoice)
                ))
            );
        });
    
    }

    return (
        <section className="pt-20 px-2 lg:px-5 w-full h-full font-mainFont1">
            <div className="flex items-center justify-between">
                <h2 className="titleText">Students</h2>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 py-5">
                {["id", "name", "batch", "invoice"].map((field, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Search by ${field}`}
                        value={searchQuery[field]}
                        onChange={(e) => handleSearchChange(e, field)}
                        className="outline-none text-sm px-3 py-3 border border-gray-300 w-full"
                    />
                ))}
                <button className="buttonStyle px-10 py-2 text-white text-lg">Search</button>
                <button
                    onClick={() => setSearchQuery(initialSearchState)}
                    className="px-5 bg-green-500 py-2 text-white text-lg rounded-md"
                >
                    Reset
                </button>
            </div>
            <div className="font-mainFont1 px-2 lg:px-5 py-5 bg-white">
                <div className="flex justify-between pb-5">
                    <h3 className="titleText">Students Fees List</h3>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-3 buttonStyle px-3 py-2 lg:py-1 text-white text-[18px]">
                            <FaDownload /> <span className="hidden lg:block">Download</span>
                        </button>
                        <button onClick={() => dispatch(setOpenModuleFees("add"))} className="flex items-center gap-3 buttonStyle px-3 py-2 text-white text-[18px]">
                            <FaPlus />
                        </button>
                    </div>
                </div>
                {/* Fees List Table */}
                <div className="w-full overflow-x-auto">
                    <table className="min-w-max w-full border-collapse border border-gray-100 text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                {feesListFields.map(({ id, title }) => (
                                    <th key={id} className="border-b border-gray-300 py-4 px-2 whitespace-nowrap">
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="font-light">
                            {filteredStudentList.map((student) => {
                                const { _id, fullName, studentID, batchID, paymentRecords, paymentDue } = student || {};
                                const { paymentId, paid_date, invoiceNumber, received_payment, payment_status } =
                                    paymentRecords[paymentRecords.length - 1] || {};
                                    console.log(paid_date)
                                const parsedPaidDate = parse(paid_date,'dd/MM/yyyy',new Date());
                                const PaidMonth = format(new Date(parsedPaidDate),'MMMM');
                                const currentMonth = format(new Date(),'MMMM');
                                const paymentStatusForThisMonth = PaidMonth.toLowerCase() === currentMonth.toLowerCase() ? "Paid" : "Unpaid";
                                const dueMonths = differenceInMonths(new Date(), parsedPaidDate);
                                console.log(dueMonths);
                                return (
                                    <tr className="border-b border-gray-300" key={_id}>
                                        <td className="py-4 px-2 whitespace-nowrap">{studentID}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{fullName}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{batchID === null ? "Batch-No" : batchID}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentStatusForThisMonth === "Paid" ? "Monthly" : "N/A"}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentStatusForThisMonth === 'Paid' ? paymentId ? "UPI" : "Cash" : 'N/A'}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentStatusForThisMonth === 'Paid' ? paid_date : 'N/A'}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentStatusForThisMonth === 'Paid' ? invoiceNumber : 'N/A'}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">{dueMonths}</td>
                                        <td className="py-4 px-2 whitespace-nowrap">
                                            <div className={`text-[12px] text-white w-fit py-1 px-2 rounded-md ${paymentStatusForThisMonth === 'Paid' ? "bg-green-500" : "bg-red-500"}`}>
                                               {paymentStatusForThisMonth}
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 whitespace-nowrap">{paymentStatusForThisMonth === 'Paid' ? received_payment : 'N/A'}</td>
                                        <td className="py-4 px-2 whitespace-nowrap flex items-center justify-center">
                                            <div onClick={()=>{dispatch(setOpenModuleFees('edit'))}} className="bg-gray-200 p-2 rounded-full hover:bg-buttonblue hover:text-white transition-all duration-500">
                                                <FiEdit />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {openFeesModule === "add" && <AddFees />}
            {openFeesModule === "edit" && <EditFees />}
        </section>
    );
};


export default AdminFeesList;