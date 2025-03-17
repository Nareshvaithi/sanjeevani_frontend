import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchStudentsRecord } from './store/adminSlices/adminStudentsSlice.jsx';
import { fetchStudentsEvents } from './store/adminSlices/EventsSlices.jsx';
import { fetchNewStudent } from './store/adminSlices/newStudentSlice.jsx';
import { fetchStudentsNotice } from './store/adminSlices/NoticeSlice.jsx';
import { ToastContainer } from 'react-toastify';
store.dispatch(fetchStudentsRecord());
store.dispatch(fetchStudentsEvents());
store.dispatch(fetchNewStudent());
store.dispatch(fetchStudentsNotice());
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
