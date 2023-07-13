import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        login: null,
        email: null,
        stateChange: null,
    },
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state,
             userId: payload.userId ,
             login: payload.login ,
             email: payload.email ,

            }),
        authStateChange : (state, {payload}) => ({
            ...state, 
             stateChange: payload. stateChange,
             }),
    }
}) 