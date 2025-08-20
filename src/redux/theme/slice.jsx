import { createSlice } from "@reduxjs/toolkit"
import { pickRandomTheme } from "../../constants/constants";

const initialState = {
    current: pickRandomTheme(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
        }
    }
});

export const setTheme = themeSlice.actions;
export const themeReducer = themeSlice.reducer;