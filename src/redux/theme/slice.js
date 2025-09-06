import { createSlice } from "@reduxjs/toolkit"
import { pickRandomTheme } from "../../constants/constants";
import { initTheme } from "./operations";

const initialState = {
    current: pickRandomTheme(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.current = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initTheme.fulfilled, (state, action) => {
                state.current = action.payload;
        })
    }
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;