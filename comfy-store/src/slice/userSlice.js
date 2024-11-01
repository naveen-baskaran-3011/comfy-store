import { createSlice } from "@reduxjs/toolkit";

const localObj = localStorage.getItem('user');
const localUserObject = localObj ? JSON.parse(localObj) : null;

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localUserObject?.user,
        jwt: localUserObject?.jwt
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload.user;
            state.jwt = action.payload.jwt;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.jwt = null;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;