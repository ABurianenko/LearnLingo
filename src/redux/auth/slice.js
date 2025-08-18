import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, refreshUser } from "./operations";

const initialState = {
    user: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => 
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = !!action.payload;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isRefreshing = false;

    })
})

export const authReducer = authSlice.reducer;