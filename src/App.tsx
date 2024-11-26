import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import './App.css';
import Dashboard from "./components/dashboard/Dashboard.tsx";
import ProtectedRoute from './ProtectedRoute.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
