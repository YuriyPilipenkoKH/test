 
 import { configureStore } from "@reduxjs/toolkit";
import { authReducer} from "./auth/authReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { themeReducer } from "./themeSlice";
import { langReducer } from "./langSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    theme:themeReducer,
    lang: langReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state invariant middleware
    }),
  enhancers: [composeWithDevTools({
    realtime: true,
    name: 'native',
    hostname: 'localhost',
    port: 1024// the port your remotedev server is running at
  })], // Add Redux DevTools enhancer
});
  
  export default store



