import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { themeReducer } from "./theme/slice";
import { themeAutoSwitchMiddleware } from "./theme/middleware";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefault) => getDefault().concat(themeAutoSwitchMiddleware)
})