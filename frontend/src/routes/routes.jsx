import { Route, Routes } from 'react-router-dom';
import EditStudent from '../pages/EditStudent';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Photo from '../pages/Photo';
import Register from '../pages/Register';
import Student from '../components/Student';
import Students from '../pages/Students';
import ClosedRoute from './ClosedRoute';

export default function MyRouter() {
  return (
    <Routes>
      <Route index element={<ClosedRoute component={<Students />} />} />
      <Route
        path="students/:id"
        element={<ClosedRoute component={<Student />} />}
      />
      <Route
        path="/photo/:id"
        element={<ClosedRoute component={<Photo />} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/students/:id/edit"
        element={<ClosedRoute component={<EditStudent />} />}
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
