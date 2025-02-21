import { Outlet } from "react-router-dom";
import AdminSideBar from "../features/admin/AdminSidebar";
import TopBar from "../features/admin/AdminTopBar";

const AdminLayout = ()=>{
    return(
        <main className="flex">
            <TopBar/>
            <AdminSideBar/>
            <Outlet/>
        </main>
    )
}

export default AdminLayout;