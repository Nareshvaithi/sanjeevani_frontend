import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <Routes>
        <Route path="/" element={<AdminLayout/>}>
            <Route index element={<AdminHome/>}/>
        </Route>
    </Routes>
  )
}

export default App;
