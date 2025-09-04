import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { themeReducer } from "./theme/slice";
import { themeAutoSwitchMiddleware } from "./theme/middleware";
import { modalReducer } from "./modal/slice";
import { teacherReducer } from "./teachers/slice";
import { favoritesReducer } from "./favorites/slice";

export const store = configureStore({
    reducer: {
        teachers: teacherReducer,
        favorites: favoritesReducer,
        modal: modalReducer,
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefault) => getDefault().concat(themeAutoSwitchMiddleware)
})

const LS_KEY = "ll-favorites-keys";
store.subscribe(() => {
  try {
    const keys = store.getState().favorites.keys;
    localStorage.setItem(LS_KEY, JSON.stringify(keys));
  } catch(err) {
      console.log(err);
  }
});