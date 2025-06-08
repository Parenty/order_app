import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderForm from './OrderForm';
import SuccessPage from './SuccessPage';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<OrderForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
} 