import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('emilys'); // Default for demo
    const [password, setPassword] = useState('emilyspass'); // Default for demo

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        // Clear previous errors on mount
        dispatch(clearError());
    }, [isAuthenticated, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) return;
        dispatch(loginUser({ username, password }));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Sign In</h2>
                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-2 text-center text-sm" style={{ fontSize: '0.8rem', color: '#666' }}>
                    (Demo: use 'emilys' / 'emilyspass')
                </p>
            </div>
        </div>
    );
};

export default Login;
