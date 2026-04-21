import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = sessionStorage.getItem('role');

  if (!role) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but not allowed
    return <Navigate to={role === 'ADMIN' ? '/admin' : '/user'} replace />;
  }

  return children;
};

export default ProtectedRoute;
