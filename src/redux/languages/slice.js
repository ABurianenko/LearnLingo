import { createSlice } from "@reduxjs/toolkit"
import { getLanguages } from "./operations"

const initialState = {
    languages: [],
    isLoading: false,
    error: null
}

const languageSlice = createSlice({
    name: 'languages',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getLanguages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLanguages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.languages = action.payload;
            })
            .addCase(getLanguages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
})

export const languagesReducer = languageSlice.reducer;