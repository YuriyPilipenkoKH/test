 
 import { configureStore } from "@reduxjs/toolkit";
import { authReducer} from "./auth/authReducer";
import { composeWithDevTools } from 'redux-devtools-extension';



const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state invariant middleware
    }),
  enhancers: [composeWithDevTools({
    realtime: true,
    name: 'native',
    hostname: 'localhost',
    port: 19000 // the port your remotedev server is running at
  })], // Add Redux DevTools enhancer
});
  
  export default store



