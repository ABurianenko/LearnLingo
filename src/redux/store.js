import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { themeReducer } from "./theme/slice";
import { themeAutoSwitchMiddleware } from "./theme/middleware";
import { modalReducer } from "./modal/slice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefault) => getDefault().concat(themeAutoSwitchMiddleware)
})