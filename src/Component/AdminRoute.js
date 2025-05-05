import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAdmin = userRole === 'admin';

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // If admin, allow access to the route
  return children;
};

export default AdminRoute;
