import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* User Route: Accessible by both USER and ADMIN */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Route: Strictly accessible by ADMIN only */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all to redirect invalid routes back to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
