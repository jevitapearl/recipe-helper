import { useAuth } from '@/contexts/AuthContext.jsx'; // Use .jsx
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { Atom } from 'react-loading-indicators'

export default function ProtectedRoute({ 
  redirectTo = '/',
  requiredRole 
}) {
  const { state } = useAuth();
  if (state.isLoading) {
    return <Atom color="#383a4e" size="medium" text="" textColor="" />;
  }

  if (!state.isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && state.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; 
  }
  
  return <Outlet />;
}