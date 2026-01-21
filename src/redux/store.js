import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState: {
    cart: preloadedState?.cart
  }
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart
  });
});
