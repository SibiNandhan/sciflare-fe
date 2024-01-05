import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import Employees from './pages/Employees';
import Header from './component/Header';
import Signup from './pages/Signup';
import Home from './pages/Home';
import OrganizationSignup from './pages/OrganizationSignup';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};
export const UnProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to= '/employees' />;
  }
  return children;
};

export default function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
      <Route path="/"
         element={
         <UnProtectedRoute>
              <Home />
         </UnProtectedRoute>
        } exact />
        <Route path="/org/signup"
         element={
         <UnProtectedRoute>
              <OrganizationSignup />
         </UnProtectedRoute>
        } exact />
        <Route path="/login"
         element={
         <UnProtectedRoute>
              <Login />
         </UnProtectedRoute>
        } exact />
          <Route path="/signup"
         element={
         <UnProtectedRoute>
              <Signup />
         </UnProtectedRoute>
        } exact />

        <Route path="/employees" element={
          <ProtectedRoute>
            <Employees/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
