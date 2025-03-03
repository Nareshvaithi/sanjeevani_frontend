import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import AdminStudentsList from "./pages/Admin/AdminStudentList";
import StudentRegistrationProcess from "./pages/Students/StudentRegistrationProcess";
import StudentLayout from "./layouts/StudentLayout";
import StudentHome from "./pages/Students/StudentHome";

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="students" element={<AdminStudentsList />} />
      </Route>

      {/* Student Routes */}
      <Route path="student/:userId" element={<StudentLayout />}>
        <Route index element={<StudentHome />} />
      </Route>

      {/* Standalone Route */}
      <Route path="student-register" element={<StudentRegistrationProcess />} />
    </Routes>
  );
}

export default App;