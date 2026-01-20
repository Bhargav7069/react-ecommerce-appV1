import { createSlice } from '@reduxjs/toolkit';


const loadCart = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        return [];
    }
};

const initialState = {
    cartItems: loadCart(),

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((i) => i.id !== id);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;


export const selectCartTotalCount = (state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);


export const selectCartTotalAmount = (state) =>
    state.cart.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
