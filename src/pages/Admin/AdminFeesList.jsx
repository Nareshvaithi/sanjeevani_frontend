import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectBreadCrumb } from "../../store/adminSlices/adminSidebarSlice";
import Breadcrumb from "../../components/Common/BreadCrumb";
import { FaDownload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { selectFeesListField, selectOpenModuleOfFees, setOpenModuleFees } from "../../store/adminSlices/feesSlice";
import AddFees from "../../features/admin/AddFees";

const AdminFeesList = ()=>{
    const openFeesModule = useSelector(selectOpenModuleOfFees);
    const dispatch = useDispatch();
    const breadcrumbItems = useSelector(selectBreadCrumb).map((item) => ({
        label: item,
        link: null, 
      }));
        const [searchQuery, setSearchQuery] = useState({
          id: "",
          name: "",
          batch: "",
          invoice:"",
        });
        const feesListFields = useSelector(selectFeesListField);
      const handleSearchChange = (e, field) => {
        setSearchQuery({
          ...searchQuery,
          [field]: e.target.value,
        });
        setCurrentPage(1);
      };
    
    return(
        <section className="pt-20 px-2 lg:px-5 w-full h-full font-mainFont1">
            <div className="flex items-center justify-between">
                <h2 className="titleText">Students</h2>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 py-5">
                {["id", "name", "batch","invoice"].map((field, index) => (
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
                        setSearchQuery({id:"", name:"", batch:"",invoice:""});
                    }}
                    className="px-5 bg-green-500 py-2 text-white text-lg rounded-md"
                    >
                    Reset
                    </button>
            </div>
            <div className="font-mainFont1 px-2 lg:px-5 py-5 bg-white">
                <div className="flex justify-between pb-5">
                    <h3 className="titleText">Students Fees List</h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={""}
                            className="flex items-center gap-3 buttonStyle px-3 py-2 lg:py-1 text-white text-[18px]"
                        >
                            <FaDownload /> <span className="hidden lg:block">Download</span>
                        </button>
                        <button
                            onClick={()=>{dispatch(setOpenModuleFees('add'))}}
                            className="flex items-center gap-3 buttonStyle px-3 py-2 text-white text-[18px]"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                {/* Fees List Table */}
                <div className="w-full overflow-x-auto">
                    <table className="min-w-max w-full border-collapse border border-gray-100 text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                {
                                    feesListFields.map(({id,title})=>{
                                        return <th key={id} className="border-b border-gray-300 py-4 px-2 whitespace-nowrap">
                                                {title}
                                            </th>
                                    })
                                }
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            {openFeesModule === 'add' && <AddFees/>}
        </section>
    )
}

export default AdminFeesList;