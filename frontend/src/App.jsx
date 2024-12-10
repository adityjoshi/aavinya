import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LoginOTPVerification from './pages/LoginOtpPage'
import SignupOTPVerification from './pages/SignupOtpPage'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import { RoutesPathName } from './constants';
import PrivateRoute from './context/PrivateRoute';
import RegisterDoctor from './pages/RegisterDoctor'
import RegisterHospital from './pages/RegisterHospital'
import RegisterStaff from './pages/RegisterStaff'
import AddBeds from './pages/AddBeds'


const router = createBrowserRouter([
	{
		path: RoutesPathName.SIGNUP_PAGE,
		index: true,
		Component: Register,
	},
	{
		path: RoutesPathName.LOGIN_PAGE,
		element: (
				<Login/>
		),
	},
	{
		path: RoutesPathName.LoginOTPVerification_Page,
		element:(
			<LoginOTPVerification/>
		),
	},
	{
		path: RoutesPathName.SignupOTPVerification_Page,
		element:(
			<SignupOTPVerification/>
		),
	},
	{
		path: RoutesPathName.DASHBOARD_PAGE,
		element: (
			// <Dashboard />
			<PrivateRoute/>
		),
	},
	{
		path: RoutesPathName.REGISTER_DOC,
		element: (
			<RegisterDoctor />
		),
	},
	{
		path: RoutesPathName.REGISTER_HOSPITAL,
		element: (
			<RegisterHospital />
		),
	},
	{
		path: RoutesPathName.REGISTER_STAFF,
		element: (
			<RegisterStaff />
		),
	},
	{
		path: RoutesPathName.ADD_BED,
		element: (
			<AddBeds />
		),
	},
	{
		path: RoutesPathName.REGISTER_DOC,
		element: (
			<RegisterDoctor />
		),
	},
	{
		path: RoutesPathName.REGISTER_HOSPITAL,
		element: (
			<RegisterHospital />
		),
	},
	{
		path: RoutesPathName.REGISTER_STAFF,
		element: (
			<RegisterStaff />
		),
	},
	{
		path: RoutesPathName.ADD_BED,
		element: (
			<AddBeds />
		),
	}
     ]);

function App() {
  
  return <RouterProvider router={router}/>;
  
 
     {/* <Login/> */}
     {/* <Register/> */}
     {/* <Dashboard/> */}
    
}

export default App
