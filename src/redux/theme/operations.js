import { createAsyncThunk } from "@reduxjs/toolkit";
import { isTheme, pickRandomTheme, THEME_STORAGE_KEY } from "../../constants/constants";

export const initTheme = createAsyncThunk(
  'theme/init',
  async () => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = isTheme(stored) ? stored : pickRandomTheme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    return theme;
  }
)