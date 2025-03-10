import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchStudentsRecord } from './store/adminSlices/adminStudentsSlice.jsx';
import { fetchNewStudent } from './store/adminSlices/newStudentSlice.jsx';
store.dispatch(fetchStudentsRecord());
store.dispatch(fetchNewStudent());
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </Provider>
)
