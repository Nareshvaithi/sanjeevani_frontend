import { useSelector } from "react-redux";
import AdminDetailsForm from "../../features/admin/AdminDetailsForm";
import AdminRegistrationProgressbar from "../../features/admin/AdminRegistrationProgressbar";
import { selectAdminRegProcess } from "../../store/authSlice/adminAuthSlice";
import AdminCredentialsForm from "../../features/admin/AdminCredentialsForm";

const AdminRegistrationProcess = ()=>{
    const adminRegProcess = useSelector(selectAdminRegProcess);
    return(
        <section>
            <AdminRegistrationProgressbar/>
            {adminRegProcess === 'adminDetails' && <AdminDetailsForm/>}
            {adminRegProcess === 'userCredentials' && <AdminCredentialsForm/>}
        </section>
    )
}

export default AdminRegistrationProcess;