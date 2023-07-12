import { db, auth } from "../../firebase/config"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const authSignUpUser =({login, email, password})=> async(dispatch, getState)=> {

    console.log(login, email, password)
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log('user', user)
    } 
    catch (error) {
      console.log(error.message)
    }
}

export const authLogInUser =({ email, password})=> async(dispatch, getState)=> {
    console.log( email, password)
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('user', user)
    } 
    catch (error) {
      console.log(error.message)
    }
}

export const authLogOutUser =()=> async(dispatch, getState)=> {

}

 