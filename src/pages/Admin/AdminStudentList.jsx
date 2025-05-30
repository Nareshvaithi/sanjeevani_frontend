import { useState } from "react";
import { FaPlus, FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import {
  selectAllStudents,
  selectStudentDataTitle,
  selectSortField,
  selectSortOrder,
  sortStudents,
} from "../../store/adminSlices/adminStudentsSlice";
import AddStudentForm from "../../features/admin/AddStudentForm";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { selectBreadCrumb } from "../../store/adminSlices/adminSidebarSlice";
import StudentDetails from "../../features/admin/StudentsDetails";
import { handleDownloadPDF } from "../../utils/studentsdownload";
import EditStudentForm from "../../features/admin/EditStudentForm";
import Breadcrumb from "../../components/Common/BreadCrumb";
import { fetchSingleStudent } from "../../store/formSlices/StudentDetailsSlice";
import { addStudentRecord } from "../../store/formSlices/RegisterFormSlice";
import { format } from "date-fns";
const AdminStudentsList = () => {
 const currentMonth=format(new Date(), "MMMM");
  const breadcrumbItems = useSelector(selectBreadCrumb).map((item) => ({
    label: item,
    link: null, 
  }));
  const dispatch = useDispatch();
  const studentList = useSelector(selectAllStudents);
  console.log("studentList",studentList)
  const sortField = useSelector(selectSortField);
  const sortOrder = useSelector(selectSortOrder);
  const studentDataTitle = useSelector(selectStudentDataTitle);
  const [openModule, setOpenModule] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState({
    id: "",
    name: "",
    batch: "",
  });

  let filteredStudents=[];
  // Filter students based on search query
 
    filteredStudents = studentList.filter((student) => {
      return (
        (searchQuery.id && student?.studentID
          ? student.studentID.toLowerCase().includes(searchQuery.id.toLowerCase())
          : true) &&
        (searchQuery.name && student?.fullName
          ? student.fullName.toLowerCase().includes(searchQuery.name.toLowerCase())
          : true) &&
        (searchQuery.batch && student?.batchID
          ? student.batchID.toLowerCase().includes(searchQuery.batch.toLowerCase())
          : true)
      );
    });
  // Pagination logic
  const studentsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // Handle search input change
  const handleSearchChange = (e, field) => {
    setSearchQuery({
      ...searchQuery,
      [field]: e.target.value,
    });
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paymentStatus = (payment)=>{

    const getPayment = payment.filter((month)=>month.monthName === currentMonth)
    const getStatus=payment.filter((status)=>status.payment_status===true)
    
    return getPayment && getStatus.length!=0 ? "Paid" : "UnPaid";
  }
  return (
    <section className="pt-20 px-2 lg:px-5 w-full h-full font-mainFont1">
      <div className="flex items-center justify-between">
        <h2 className="titleText">Students</h2>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Search Inputs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 py-5">
        {["id", "name", "batch"].map((field, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Search by ${field}`}
            value={searchQuery[field]}
            onChange={(e) => handleSearchChange(e, field)}
            className="outline-none text-sm px-3 py-3 border border-gray-300 w-full"
          />
        ))}
        <button className="buttonStyle px-10 py-2 text-white text-lg">
          Search
        </button>
        <button
          onClick={() => {
            setSearchQuery({id: "", name: "", batch:""});
          }}
          className="px-5 bg-green-500 py-2 text-white text-lg rounded-md"
        >
          Reset
        </button>
      </div>

      <div className="font-mainFont1 px-2 lg:px-5 py-5 bg-white">
        <div className="flex justify-between pb-5">
          <h3 className="titleText">Students List</h3>
          <h2 className="text-2xl text-gray-500">
            {currentStudents.length === 0 ? "No Student Found!" : ""}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownloadPDF(filteredStudents)}
              className="flex items-center gap-3 buttonStyle px-3 py-2 lg:py-1 text-white text-[18px]"
            >
              <FaDownload /> <span className="hidden lg:block">Download</span>
            </button>
            <button
              onClick={() => setOpenModule("add")}
              className="flex items-center gap-3 buttonStyle px-3 py-2 text-white text-[18px]"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-max w-full border-collapse border border-gray-100 text-left">
            <thead className="bg-gray-50">
              <tr>
                {studentDataTitle.map(({ id, title }) => (
                  <th
                    key={id}
                    className="border-b border-gray-300 py-4 px-2 whitespace-nowrap"
                  >
                    <div className="w-full flex justify-between items-center">
                      <span>{title}</span>
                      {(title == "Name" ||
                        title == "ID" ||
                        title == "Gender" ||
                        title == "Payment") && (
                        <div
                          onClick={() =>
                            dispatch(sortStudents(title.toLowerCase()))
                          }
                          className="cursor-pointer text-gray-500 hover:text-gray-800 flex items-center"
                        >
                          <BiSort />
                          {sortField === title.toLowerCase() &&
                            (sortOrder === "asc" ? "↑" : "↓")}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-light">
              {currentStudents.map((student) => {
                const {_id,studentID,fullName,gender,email,status,paymentRecords,batchID,imageUrls,phone} = student;

                const studentStatus = status ? "Active" : "InActive";
                return <tr key={_id} className="odd:bg-gray-100">
                  <td className="py-4 px-2 whitespace-nowrap">{studentID}</td>
                  <td className="py-4 px-2 flex items-center gap-3 whitespace-nowrap">
                    <img className="w-10 h-10 rounded-full border object-cover" src={imageUrls} alt="image" />
                    <p>{fullName}</p>
                  </td>
                  {email ? <td className="py-4 px-2 whitespace-nowrap" title={email}>{`${email.substring(0, 20)}...`}</td> : <td className="py-4 px-2 whitespace-nowrap" title={email}>email not provided</td>}
                  
                  <td className="py-4 px-2 whitespace-nowrap">
                    <span className={`${gender.toLowerCase() === "male" ? "bg-themelightblue" : "bg-pink-600"} text-[12px] text-white px-2 py-1 rounded-md`}>{gender}</span>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap">{batchID}</td>
                  <td className="py-4 px-2 whitespace-nowrap">{phone}</td>
                  <td className="py-4 px-2 whitespace-nowrap">
                    <span className={`text-[12px] text-white px-2 py-1 rounded-md ${paymentStatus(paymentRecords).toLowerCase() === "paid" ? "bg-green-500" : paymentStatus(paymentRecords).toLowerCase() === "unpaid" ? "bg-red-500" : "bg-themeyellow"}`}>{paymentStatus(paymentRecords)}</span>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap">{phone}</td>
                  <td className={`py-4 px-2 whitespace-nowrap`}>
                    <span className={`${status ? "bg-themedarkblue" : "bg-themeyellow"} text-[12px] text-white px-2 py-1 rounded-md`}>{studentStatus}</span>
                  </td>
                  <td className="flex py-4 px-2 items-center gap-5 whitespace-nowrap">
                    <div
                      onClick={() => {
                        setOpenModule("view");
                        dispatch(fetchSingleStudent(_id));
                      }
                    }
                      className="bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300"
                    >
                      <MdOutlineRemoveRedEye />
                    </div>
                    <div
                      onClick={() => {
                        setOpenModule("edit");
                        dispatch(fetchSingleStudent(_id));
                      }
                    }
                      className="bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300"
                    >
                      <FiEdit />
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center gap-3 mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md text-themelightblue disabled:opacity-50 disabled:text-gray-700"
          >
            Previous
          </button>
          <span className="text-sm font-semibold text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md text-themelightblue disabled:opacity-50 disabled:text-gray-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {openModule === "add" && (
          <AddStudentForm setOpenModule={setOpenModule} />
        )}
        {openModule === "view" && (
          <StudentDetails
            openModule={openModule}
            setOpenModule={setOpenModule}
          />
        )}
        {openModule === "edit" && (
          <EditStudentForm
            openModule={openModule}
            setOpenModule={setOpenModule}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminStudentsList;
