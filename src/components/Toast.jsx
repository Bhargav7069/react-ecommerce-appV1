import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../redux/slices/uiSlice';
import './Toast.css';

const ToastItem = ({ id, message, type, duration }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeToast(id));
        }, duration);

        return () => clearTimeout(timer);
    }, [dispatch, id, duration]);

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-message">{message}</span>
            <button
                className="toast-close"
                onClick={() => dispatch(removeToast(id))}
            >
                &times;
            </button>
        </div>
    );
};

const ToastContainer = () => {
    const toasts = useSelector((state) => state.ui.toasts);

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} {...toast} />
            ))}
        </div>
    );
};

export default ToastContainer;
