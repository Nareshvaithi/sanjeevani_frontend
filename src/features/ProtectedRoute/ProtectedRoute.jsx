import { useSelector } from "react-redux";
import { selectLoginStatus } from "../../store/authSlice/loginSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const location = useLocation()
    const loginStatus = useSelector(selectLoginStatus);
    return loginStatus || loginStatus !== null ? children : <Navigate to={'/'} state={{from:location}} replace/>
}

export default ProtectedRoute;