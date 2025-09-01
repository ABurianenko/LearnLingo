import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    authModal: null,
    bookModal: null,
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
        openBookModal: (state) => {
            state.bookModal = 'book'
        },
        closeModal: (state) => {
            state.authModal = null;
            state.bookModal = null
        }
    }
});

export const { openLoginModal, openRegisterModal, closeModal, bookModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;