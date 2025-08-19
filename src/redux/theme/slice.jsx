import { createSlice } from "@reduxjs/toolkit"
import { initTheme } from "./operations";
import { STORAGE_KEY } from "../../constants/constants";

const getInitialTheme = () => {
    return localStorage.getItem(STORAGE_KEY);
}

const initialState = {
    mode: getInitialTheme || 'yellow',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initTheme.fulfilled, (state, action) => {
                state.mode = action.payload;
        })
    }
});

export const setTheme = themeSlice.actions;
export const themeReducer = themeSlice.reducer;