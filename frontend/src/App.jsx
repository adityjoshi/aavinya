import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import CompounderDashboard from './pages/CompounderDashboard';
import LoginOTPVerification from './pages/LoginOtpPage';
import { RoutesPathName } from './constants';
import PrivateRoute from './context/PrivateRoute';
import RegisterDoctor from './pages/RegisterDoctor';
import RegisterHospital from './pages/RegisterHospital';
import RegisterStaff from './pages/RegisterStaff';
import AddBeds from './pages/AddBeds';
import UpdateBeds from './pages/UpdateBeds';
import MainLayout from './pages/layout/mainlayout';
import { LandingPage } from './pages/landingPage/landingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,  // Landing Page should be first
  },
  {
    path: RoutesPathName.SIGNUP_PAGE,
    element: <Register />,
  },
  {
    path: RoutesPathName.LOGIN_PAGE,
    element: <Login />,
  },
  {
    path: RoutesPathName.LoginOTPVerification_Page,
    element: <LoginOTPVerification />,
  },
  {
    path: RoutesPathName.UPDATE_BED,
    element: <UpdateBeds />,
  },
  {
   
    path: '/',
    element: (
      <PrivateRoute>
        {/* <Dashboard > */}
          <MainLayout />
        {/* </Dashboard> */}
      </PrivateRoute>
    ),
    children: [
      {
        path: RoutesPathName.DASHBOARD_PAGE,
        element: <Dashboard />,
      },
      // {
      //   path: RoutesPathName.ADMINDASHBOARD_PAGE,
      //   element: <AdminDashboard />,
      // },
      // {
      //   path: RoutesPathName.COMPOUNDERDASHBOARD_PAGE,
      //   element: <CompounderDashboard />,
      // },
      {
        path: RoutesPathName.REGISTER_DOC,
        element: <RegisterDoctor />,
      },
      {
        path: RoutesPathName.REGISTER_HOSPITAL,
        element: <RegisterHospital />,
      },
      {
        path: RoutesPathName.REGISTER_STAFF,
        element: <RegisterStaff />,
      },
      {
        path: RoutesPathName.ADD_BED,
        element: <AddBeds />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;