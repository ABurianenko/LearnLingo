import { createAsyncThunk } from "@reduxjs/toolkit";
import { isTheme, pickRandomTheme, STORAGE_KEY } from "../../constants/constants";

export const initTheme = createAsyncThunk(
    'theme/init',
    async (args) => {
        const persist = args.persist ?? false;
        const stored = localStorage.getItem(STORAGE_KEY);
        const theme = isTheme(stored && !null) ? stored : pickRandomTheme();
        if (persist) localStorage.setItem(STORAGE_KEY, theme);
        return theme;
    }
)