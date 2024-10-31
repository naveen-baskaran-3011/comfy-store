import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        jwt: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.jwt = action.payload.jwt;
        },
        logout: (state) => {
            state.user = null;
            state.jwt = null;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;