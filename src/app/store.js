import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import loaderReducer from "@/features/loader/loaderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
    },
})

export default store;