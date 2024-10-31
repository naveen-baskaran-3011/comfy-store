import { createSlice } from "@reduxjs/toolkit";

function findProductIndex(itemConfig, cartItems) {
    const { product_id, color } = itemConfig;
    return cartItems.findIndex(item => item.product_id === product_id && item.color === color);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
        count: 0
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
        },
        updateCartItem: (state, { payload }) => {
            const productIndex = findProductIndex(payload, state.value);
            if (productIndex > -1) {
                state.value[productIndex].quantity = payload.quantity;
            }
        },
        removeFromCart: (state, { payload }) => {
            const productIndex = findProductIndex(payload, state.value);
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