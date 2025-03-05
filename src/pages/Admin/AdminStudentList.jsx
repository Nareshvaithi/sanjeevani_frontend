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
const AdminStudentsList = () => {

  const breadcrumbItems = useSelector(selectBreadCrumb).map((item) => ({
    label: item,
    link: null, // You can set the link if needed
  }));
  const dispatch = useDispatch();
  const studentList = useSelector(selectAllStudents);
  const sortField = useSelector(selectSortField);
  const sortOrder = useSelector(selectSortOrder);
  const studentDataTitle = useSelector(selectStudentDataTitle);
  const [openModule, setOpenModule] = useState({ type: null, data: null });
  console.log(studentList);
  // State for search query
  const [searchQuery, setSearchQuery] = useState({
    id: "",
    name: "",
    // batch: "",
  });
  let paidstatus=""
  // Filter students based on search query
  const filteredStudents = studentList.filter((student) => {
   
    return (
      student._id.toString().includes(searchQuery.id.toLowerCase()) &&
      student.fullName.toLowerCase().replaceAll(' ',"").includes(searchQuery.name.toLowerCase()) 
      // student.batchID.toLowerCase().replaceAll(' ',"").includes(searchQuery.batch.toLowerCase())
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

  const handleOpenModule = (type, data = null) => {
    setOpenModule({ type, data });
  };

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
            setSearchQuery({id: "", name: "",batch:""});
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
              onClick={() => handleOpenModule("add")}
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
              {currentStudents.map((student,index) => {
                const {_id,fullName,gender,email,status,paymentRecords,BatchID,imageUrls} = student;
                console.log(fullName);
                const studentStatus = status ? "Active" : "InActive";
                return <tr key={_id} className="odd:bg-gray-100">
                  <td className="py-4 px-2 whitespace-nowrap">{index+1}</td>
                  <td className="py-4 px-2 flex gap-3 items-center whitespace-nowrap">
                    <img className="w-10 rounded-full" src={imageUrls} alt="" />
                    <span>{fullName}</span>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap" title={email}>{`${email.substring(0, 20)}...`}</td>
                  <td className="py-4 px-2 whitespace-nowrap">
                    <span className={`${gender.toLowerCase() === "male" ? "bg-themelightblue" : "bg-pink-600"} text-[12px] text-white px-2 py-1 rounded-md`}>{gender}</span>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap">{'Batch 1'}</td>
                  <td className="py-4 px-2 whitespace-nowrap">
                    <span className={`text-[12px] text-white px-2 py-1 rounded-md`}>{gender}</span>
                  </td>
                  <td className={`py-4 px-2 whitespace-nowrap ${status ? '' : ''}`}>
                  <span className={`${status ? "bg-themedarkblue" : "bg-themeyellow"} text-[12px] text-white px-2 py-1 rounded-md`}>{studentStatus}</span>
                  </td>
                  <td className="flex py-4 px-2 items-center gap-5 whitespace-nowrap">
                    <div
                      onClick={() => {
                        handleOpenModule("view", student)
                        // dispatch(fetchSingleStudent(student._id))
                      }
                    }
                      className="bg-gray-200 hover:bg-buttonblue hover:text-white rounded-full p-2 transition-colors duration-300"
                    >
                      <MdOutlineRemoveRedEye />
                    </div>
                    <div
                      onClick={() => handleOpenModule("edit", student)}
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
        {openModule?.type === "add" && (
          <AddStudentForm setOpenModule={setOpenModule} />
        )}
        {openModule?.type === "view" && (
          <StudentDetails
            studentData={openModule.data}
            openModule={openModule}
            setOpenModule={setOpenModule}
          />
        )}
        {openModule?.type === "edit" && (
          <EditStudentForm
            studentData={openModule.data}
            openModule={openModule}
            setOpenModule={setOpenModule}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminStudentsList;
