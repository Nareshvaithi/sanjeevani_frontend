import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import AdminStudentsList from "./pages/Admin/AdminStudentList";
import StudentRegistrationProcess from "./pages/Students/StudentRegistrationProcess";

function App() {
  return (
    <Routes>
        <Route path="/" element={<AdminLayout/>}>
            <Route index element={<AdminHome/>}/>
            <Route path="/students" element={<AdminStudentsList/>}/>
        </Route>
        <Route path="/std_reg" element={<StudentRegistrationProcess/>}/>
    </Routes>
  )
}

export default App;
