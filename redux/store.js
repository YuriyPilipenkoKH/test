 import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { createStore, applyMiddleware } from 'redux';
import { authSlice } from "./auth/authReducer";
import thunk from 'redux-thunk'; // Assuming you have redux-thunk middleware installed

import { composeWithDevTools } from 'remote-redux-devtools';

let composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Yuriy',
  hostname: 'localhost',
  port: 8000, // the port your remotedev server is running at
});



const rootReducer = combineReducers({
[authSlice.name]: authSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk],
  // enhancers: [composeEnhancers]
});

  
  export default store