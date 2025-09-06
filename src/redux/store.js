import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { themeReducer } from "./theme/slice";
import { modalReducer } from "./modal/slice";
import { teacherReducer } from "./teachers/slice";
import { favoritesReducer } from "./favorites/slice";
import { THEME_STORAGE_KEY } from "../constants/constants";

export const store = configureStore({
    reducer: {
        teachers: teacherReducer,
        favorites: favoritesReducer,
        modal: modalReducer,
        auth: authReducer,
        theme: themeReducer,
    }
})

let lastTheme;
store.subscribe(() => {
  const theme = store.getState().theme.current;
  if (theme && theme !== lastTheme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    lastTheme = theme;
  }
});

const LS_KEY = "ll-favorites-keys";
store.subscribe(() => {
  try {
    const keys = store.getState().favorites.keys;
    localStorage.setItem(LS_KEY, JSON.stringify(keys));
  } catch(err) {
      console.log(err);
  }
});