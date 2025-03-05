import { Outlet } from "react-router-dom";
import AdminSideBar from "../features/admin/AdminSidebar";
import TopBar from "../features/admin/AdminTopBar";
import { useSelector } from "react-redux";
import { selectOpenSidebar } from "../store/adminSlices/adminSidebarSlice";

const AdminLayout = ()=>{
    const openSidebar = useSelector(selectOpenSidebar);
    return(
        <main className="flex w-full">
            <TopBar/>
            <AdminSideBar/>
            <div className={`${openSidebar ? "pl-0 lg:pl-60" : "pl-0"} bg-gray-100 w-full transition-all duration-500 ease-in-out`}>
                <Outlet />
            </div>
        </main>
    )
}

export default AdminLayout;