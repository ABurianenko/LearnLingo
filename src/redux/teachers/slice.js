import { createSlice } from "@reduxjs/toolkit"
import { fetchTeachers } from "./operations"

const initialState = {
    items: [],
    isLoading: false,
    error: null
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
                state.items = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
})

export const teacherReducer = teachersSlice.reducer;