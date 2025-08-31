import { createSlice } from "@reduxjs/toolkit"
import { fetchTeachers } from "./operations"

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 4,
    totalPages: 1,
}

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.isLoading = false;

                if (action.payload.page === 1) {
                    state.items = action.payload.items;
                } else {
                    state.items = [...state.items, ...action.payload.items]
                }
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;

                state.error = null;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
})

export const teacherReducer = teachersSlice.reducer;