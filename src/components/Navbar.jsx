import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { selectCartTotalCount } from '../redux/slices/cartSlice';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cartCount = useSelector(selectCartTotalCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">ShopApp</Link>

            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/checkout" className="nav-link cart-link">
                            Cart
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                        <span className="user-welcome">Hi, {user?.firstName}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
