import * as firebase  from "firebase";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgFfIOR2QuDyw2WWM8v2wvYl42RLGKjk0",
  authDomain: "test-96187.firebaseapp.com",
  projectId: "test-96187",
  storageBucket: "test-96187.appspot.com",
  messagingSenderId: "625080662746",
  appId: "1:625080662746:web:725566842e3e42025103e3",
  measurementId: "G-1EMZNXNNCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase