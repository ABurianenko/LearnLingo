import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    authModal: null,
    bookModal: null,
    bookingTeacher: null
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
        openBookModal: (state, action) => {
            state.bookModal = 'book';
            state.bookingTeacher = action.payload
        },
        closeModal: (state) => {
            state.authModal = null;
            state.bookModal = null;
            state.bookingTeacher = null
        }
    }
});

export const { openLoginModal, openRegisterModal, closeModal, openBookModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;