import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    selectCartTotalAmount,
    selectCartTotalCount
} from '../redux/slices/cartSlice';
import './Checkout.css';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const totalAmount = useSelector(selectCartTotalAmount);
    const totalCount = useSelector(selectCartTotalCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        alert('Order Placed Successfully! (Simulation)');
        dispatch(clearCart());
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container empty-cart">
                <h2>Your Cart is Empty</h2>
                <p className="mt-2 mb-2">Looks like you haven't added any items yet.</p>
                <Link to="/" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container checkout-container">
            <div className="cart-list">
                <h2>Shopping Cart ({totalCount} items)</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.thumbnail} alt={item.title} className="item-image" />
                        <div className="item-details">
                            <h3 className="item-title">{item.title}</h3>
                            <p className="item-price">${item.price}</p>
                            <div className="item-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                >+</button>
                                <div style={{ flex: 1 }}></div>
                                <button
                                    className="btn-remove"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                >Remove</button>
                            </div>
                        </div>
                        <div className="item-subtotal">
                            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="summary-total">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button className="btn btn-checkout" onClick={handlePlaceOrder}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Checkout;
