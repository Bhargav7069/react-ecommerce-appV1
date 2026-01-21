import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [], // Array of { id, message, type: 'info' | 'success' | 'warning' | 'error', duration }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addToast: (state, action) => {
            const { message, type = 'info', duration = 3000 } = action.payload;
            const id = Date.now();
            state.toasts.push({ id, message, type, duration });
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
    },
});

export const { addToast, removeToast } = uiSlice.actions;

// Thunk to show toast with auto-dismiss
export const showToast = (message, type = 'info', duration = 3000) => (dispatch) => {
    const id = Date.now();
    dispatch(uiSlice.actions.addToast({ id, message, type, duration }));

    // Auto remove handled by component effect or here? 
    // Usually component handles timer to avoid side effects in reducer, 
    // but dispatching remove action after timeout is a common pattern for global logic.
    setTimeout(() => {
        dispatch(uiSlice.actions.removeToast(id));
    }, duration + 300); // Small buffer for animation
};

export default uiSlice.reducer;
