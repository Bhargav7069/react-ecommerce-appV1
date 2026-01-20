import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
};

export default AppRoutes;
