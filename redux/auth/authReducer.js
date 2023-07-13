import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, signInUser, watchAuthState, signOutUser } from './authOperations';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      userId: null,
      login: null,
      email: null,
      stateChange: false,
      isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userId = action.payload.userId;
          state.email = action.payload.email;
        })
        .addCase(createUser.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(signInUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signInUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userId = action.payload.userId;
          state.email = action.payload.email;
        })
        .addCase(signInUser.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(watchAuthState.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(watchAuthState.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userId = action.payload.userId;
          state.email = action.payload.email;
          state.login = action.payload.login;
          state.stateChange = action.payload.stateChange;
        })
        .addCase(watchAuthState.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(signOutUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signOutUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userId = action.payload.userId;
          state.email = action.payload.email;
          state.login = action.payload.login;
          state.stateChange = true;
        })
        .addCase(signOutUser.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });
  
export const authReducer = authSlice.reducer;