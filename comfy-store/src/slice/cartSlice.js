import { createSlice } from "@reduxjs/toolkit";

function findProductIndex(itemConfig, cartItems) {
    const { product_id, color } = itemConfig;
    return cartItems.findIndex(item => item.product_id === product_id && item.color === color);
}

const cachedObj = localStorage.getItem('orders');
const initialObj = cachedObj ? JSON.parse(cachedObj) : null;

function updateLocalStorage(state) {
    localStorage.setItem('orders', JSON.stringify(state));
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: initialObj?.value || [],
        count: initialObj?.count || 0
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const productIndex = findProductIndex(payload, state.value);
            if (productIndex > -1) {
                state.value[productIndex].quantity += payload.quantity;
            } else {
                payload.id = `${Math.random() * 16}-${Math.random() * 16}`
                state.value.push(payload);
            }

            state.count = state.value.length;
            updateLocalStorage(state);
        },
        updateCartItem: (state, { payload }) => {
            const productIndex = findProductIndex(payload, state.value);
            if (productIndex > -1) {
                state.value[productIndex].quantity = payload.quantity;
            }
            updateLocalStorage(state);
        },
        removeFromCart: (state, { payload }) => {
            const productIndex = findProductIndex(payload, state.value);
            if (productIndex > -1) {
                state.value.splice(productIndex, 1);
            }
            state.count = state.value.length;
            updateLocalStorage(state);
        },
        removeAllProducts: (state) => {
            state.value = [];
            state.count = 0;
            updateLocalStorage(state);
        }
    }
});

export const {
    addToCart,
    updateCartItem,
    removeFromCart,
    removeAllProducts } = cartSlice.actions;

export default cartSlice.reducer;