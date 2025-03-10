import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import AdminStudentsList from "./pages/Admin/AdminStudentList";
import StudentRegistrationProcess from "./pages/Students/StudentRegistrationProcess";
import StudentLayout from "./layouts/StudentLayout";
import StudentHome from "./pages/Students/StudentHome";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./features/ProtectedRoute/ProtectedRoute";
import Context from "./Context";
import ApplyLeave from "./features/students/ApplyLeave";
import NewStudents from "./pages/Admin/NewStudents";


function App() {

  return (
    <Context >
    <Routes>
      {/* Admin Routes with Protected Access */}
      <Route path="/admin_dashboard" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>
        <Route index element={<AdminHome />} />
        <Route path="students" element={<AdminStudentsList />} />
        <Route path="new-students" element={<NewStudents/>}/>
      </Route>

      {/* Student Routes */}
      <Route path="/student/:userId" element={<ProtectedRoute> <StudentLayout/> </ProtectedRoute>}>
        <Route index element={<StudentHome />} />
        <Route path="apply_leave" element={<ApplyLeave/>}/>
      </Route>
      {/* Login */}
      <Route path="/" element={<Login />} />
      {/* Standalone Route */}
      <Route path="/student_registration" element={<StudentRegistrationProcess />} />
    </Routes>
    </Context>
  );
}

export default App;
