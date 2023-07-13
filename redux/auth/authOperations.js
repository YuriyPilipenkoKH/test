import { db, auth } from "../../firebase/config"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { authSlice } from "./authReducer";


export const authSignUpUser =({login, email, password})=> async(dispatch, getState)=> {

    console.log(login, email, password)
    try {
      await auth.createUserWithEmailAndPassword( email, password)
   
      const user = await auth.currentUser
      await user.updateUserProfile({displayName: login})

      const {uid, displayName, email} = await auth.currentUser

      const userUpdateProfile = {
        userId: uid,
        login: displayName,
         email,
      }
      
      console.log('userUpdateProfile', userUpdateProfile)
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
    } 
    catch (error) {
      console.log(error.message)
    }
}

export const authLogInUser =({ email, password})=> async(dispatch, getState)=> {
    console.log( email, password)
    try {
      const user = await auth.signInWithEmailAndPassword( email, password)

      // await user.updateUserProfile({displayName: login})

      const {uid, displayName, email} = await auth.currentUser

      const userUpdateProfile = {
        userId: uid,
        login: displayName,
         email,
      }
      
      console.log('userUpdateProfile', userUpdateProfile)
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
    } 
    catch (error) {
      console.log(error.message)
    }
}

export const authLogOutUser =()=> async(dispatch, getState)=> {

}

export const authStateChangeUser =()=> async(dispatch, getState)=> {
  
  auth.onAuthStateChanged((user) =>   {
    if(user) {
       dispatch(authSlice.actions.updateUserProfile(use))
    }
  })
}

 