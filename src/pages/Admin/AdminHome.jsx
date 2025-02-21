import totalStudentImg from "../../assets/images/admin/home/total-student.png";
import newStudentImg from "../../assets/images/admin/home/new-student.png";
import nonPaidImg from "../../assets/images/admin/home/non-paid.png";
import feesCollectionImg from "../../assets/images/admin/home/fees-collection.png";
import QuickBox from "../../components/AdminComp/QuickBox";
import BoysAndGirlsChart from "../../components/AdminComp/BoysAndGirlsChart";
import TotalStudentsChart from "../../components/AdminComp/TotalStudentsChart";
const AdminHome = ()=>{
    return (
        <section className="bg-gray-100 pt-16 w-full h-screen">
           <div className="px-5 w-full py-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Welcome Admin!</h2>
                    <p>Home / Admin</p>
                </div>
                <div className="grid grid-cols-4 gap-5 pt-5">
                    <QuickBox title={"Total Students"} icon={totalStudentImg} count={300}/>
                    <QuickBox title={"New Students"} icon={newStudentImg} count={300}/>
                    <QuickBox title={"Un Paid Students"} icon={nonPaidImg} count={300}/>
                    <QuickBox title={"Fees Collections"} icon={feesCollectionImg} count={`₹${300}`}/>
                </div>
           </div>
           <div className="w-full grid grid-cols-2 gap-5">
            <div className="bg-white p-5">
                <TotalStudentsChart/>
            </div>
                <div className="bg-white p-5">
                    <BoysAndGirlsChart/>
                </div>
           </div>
        </section>
    )
}

export default AdminHome;