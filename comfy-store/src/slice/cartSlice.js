import { createSlice } from "@reduxjs/toolkit";

function findProductIndex(id, cartItems) {
    return cartItems.findIndex(item => item.id === id);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
        count: 0
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const productIndex = findProductIndex(payload.id, state.value);
            if (productIndex > -1) {
                state.value[productIndex].quantity += payload.quantity;
            } else {
                state.value.push(payload);
            }

            state.count = state.value.length;
        },
        updateCartItem: (state, { payload }) => {
            const productIndex = findProductIndex(payload.id, state.value);
            if (productIndex > -1) {
                state.value[productIndex] = payload;
            }
        },
        removeFromCart: (state, { payload }) => {
            const productConfig = findProductIndex(payload.id, state.value);
            if (productIndex > -1) {
                state.value.splice(productIndex, 1);
            }
            state.count = state.value.length;
        },
        removeAllProducts: (state) => {
            state.value = [];
            state.count = 0;
        }
    }
});

export const {
    addToCart,
    updateCartItem,
    removeFromCart,
    removeAllProducts } = cartSlice.actions;

export default cartSlice.reducer;