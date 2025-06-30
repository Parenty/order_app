import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import OrderForm from './OrderForm';
import SuccessPage from './SuccessPage';
import AuthPage from './AuthPage';

function RequireAuth({ children }) {
  const location = useLocation();
  const isAuth = sessionStorage.getItem('authorized') === 'true';
  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={
        <div className="app-container">
          <RequireAuth>
            <OrderForm />
          </RequireAuth>
        </div>
      } />
      <Route path="/success" element={
        <div className="app-container">
          <RequireAuth>
            <SuccessPage />
          </RequireAuth>
        </div>
      } />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
} 