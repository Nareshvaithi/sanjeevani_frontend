import totalStudentImg from "../../assets/images/admin/home/total-student.png";
import newStudentImg from "../../assets/images/admin/home/new-student.png";
import nonPaidImg from "../../assets/images/admin/home/non-paid.png";
import feesCollectionImg from "../../assets/images/admin/home/fees-collection.png";
import QuickBox from "../../components/AdminComp/QuickBox";
import BoysAndGirlsChart from "../../components/AdminComp/BoysAndGirlsChart";
import TotalStudentsChart from "../../components/AdminComp/TotalStudentsChart";
import AttendanceChart from "../../components/AdminComp/AttendanceChart";
import { useSelector } from "react-redux";
import { selectBreadCrumb } from "../../store/adminSlices/adminSidebarSlice";
import Breadcrumb from "../../components/Common/BreadCrumb";
const AdminHome = ()=>{
    const breadcrumbItems = useSelector(selectBreadCrumb).map((item) => ({
        label: item,
        link: null, // You can set the link if needed
      }));
    return (
        <section className="bg-gray-100 pt-16 w-full h-auto">
           <div className="px-2 lg:px-5 w-full py-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-semibold">Welcome Admin!</h2>
                    <Breadcrumb items={breadcrumbItems}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 pt-5">
                    <QuickBox title={"Total Students"} icon={totalStudentImg} count={300}/>
                    <QuickBox title={"New Students"} icon={newStudentImg} count={300}/>
                    <QuickBox title={"Un Paid Students"} icon={nonPaidImg} count={300}/>
                    <QuickBox title={"Fees Collections"} icon={feesCollectionImg} count={`₹${300}`}/>
                </div>
           </div>
           <div className="w-full grid grid-col-1 lg:grid-cols-2 gap-5 px-2 lg:px-5">
                <div className="bg-white p-5 rounded-xl">
                    <TotalStudentsChart/>
                </div>
                <div className="bg-white p-5 rounded-xl">
                    <BoysAndGirlsChart/>
                </div>
                <div className="bg-white p-5 rounded-xl">
                    <AttendanceChart/>
                </div>
           </div>
        </section>
    )
}

export default AdminHome;