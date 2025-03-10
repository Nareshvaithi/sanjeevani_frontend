import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import AdminStudentsList from "./pages/Admin/AdminStudentList";
import StudentRegistrationProcess from "./pages/Students/StudentRegistrationProcess";
import StudentLayout from "./layouts/StudentLayout";
import StudentHome from "./pages/Students/StudentHome";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./features/ProtectedRoute/ProtectedRoute";
import ApplyLeave from "./features/students/ApplyLeave";
import NewStudents from "./pages/Admin/NewStudents";
import AdminAttendance from "./store/adminSlices/AdminAttendance";
import AdminStudentsEvents from "./features/admin/AdminStudentsEvents";

function App() {
  
  return (
    
      <Routes>
        {/* Admin Routes with Protected Access */}
        <Route
          path="/admin_dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <AdminLayout />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="students" element={<AdminStudentsList />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="events" element={<AdminStudentsEvents />} />
          <Route path="new-students" element={<NewStudents />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student/:userId"
          element={
            <ProtectedRoute>
              {" "}
              <StudentLayout />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="apply_leave" element={<ApplyLeave />} />
        </Route>
        {/* Login */}
        <Route path="/" element={<Login />} />
        {/* Standalone Route */}
        <Route
          path="/student_registration"
          element={<StudentRegistrationProcess />}
        />
      </Routes>

  );
}

export default App;
