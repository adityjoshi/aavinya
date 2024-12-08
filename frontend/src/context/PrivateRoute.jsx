import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RegisterDoctor from '../pages/RegisterDoctor';
import RegisterHospital from '../pages/RegisterHospital';
import RegisterStaff from '../pages/RegisterStaff';
import AddBeds from '../pages/AddBeds';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
  const { authToken, headers } = useAuth();

  console.log(authToken, headers);

  return authToken ? (
    <>
    <Dashboard/>
    <RegisterDoctor/>
    <RegisterHospital/>
    <RegisterStaff/>
    <AddBeds/>
    </>
  ) : (
    <Navigate to="/login" /> 
  );
};

export default PrivateRoute;
