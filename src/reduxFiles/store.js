import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import taskReducer from "./slices/tasks"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        tasks:taskReducer
    }
})