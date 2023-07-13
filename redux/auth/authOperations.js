import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';


// Async thunk to handle createUserWithEmailAndPassword
export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
      const userinfo = await auth.currentUser
      console.log('user->',userinfo)
      return { userId: user.uid, email: user.email ,login: displayName,};
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to handle signInWithEmailAndPassword
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userinfo = await auth.currentUser
      console.log('user->',userinfo)
      return { userId: user.uid, email: user.email  };
    } catch (error) {
      throw error;
    }
  }
);

export const setAuthData = (userData) => {
  return {
    type: 'auth/setAuthData',
    payload: userData,
  };
};

// Async thunk to handle onAuthStateChanged
export const watchAuthState = createAsyncThunk(
  'auth/watchAuthState',
  async ({ dispatch, getState}) => {
    try {
      // console.log('watchAuthState')
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const userData = { userId: user.uid, email: user.email, login: user.displayName, stateChange: true };
          // Dispatch an action with the serializable payload
          dispatch(setAuthData(userData));
        } else {
          // User is signed out
          const userData = { userId: null, email: null, login: false, stateChange: true };
          // Dispatch an action with the serializable payload
          dispatch(setAuthData(userData));
        }
      });

      return unsubscribe;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to handle signOut
export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  try {
    await signOut(auth);
    return { userId: null, email: null, login: false };
  } catch (error) {
    throw error;
  }
});