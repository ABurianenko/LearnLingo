import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    authModal: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.authModal = 'login'
        },
        openRegisterModal: (state) => {
            state.authModal = 'register'
        },
        closeModal: (state) => {
            state.authModal = null
        }
    }
});

export const { openLoginModal, openRegisterModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;