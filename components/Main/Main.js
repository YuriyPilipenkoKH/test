import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import LoginScreen from '../LoginScreen/LoginScreen';
import Home from '../Home/Home';
import RegistrationScreen from '../RegistrationScreen/RegistrationScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../redux/auth/authReducer';
import { authStateChangeUser } from '../../redux/auth/authOperations';
import { watchAuthState } from '../../redux/auth/authOperations';
import { useAuth } from '../../redux/selectors';


const Stack = createNativeStackNavigator();

const Main = () => {

    const state = useSelector((state) => state)
    const {userId } = useAuth();

    // console.log('state:', state)
    const dispatch = useDispatch()

    // useEffect(() => {

    //     dispatch(authStateChangeUser())
    //     setUser(user)
    //  }, []);

    useEffect(() => {
    //  dispatch(watchAuthState((user) => {
    //   console.log('user->',user)
    //     // setUser(user.userId)
    //  }))
  //  auth.onAuthStateChanged((user) => {
  //   console.log('user->',user)
  //   setUser(user)
  //   dispatch(authSlice.actions.updateUserProfile({ 
  //       email: user.email,
  //       login: user.displayName,
  //       userId: user.uid,
//     }))
// })
    }, []);

  if(!userId){
    return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
        <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
        
            </Stack.Navigator>
      </NavigationContainer>
  
    )
  }
  else {
    return (
    
      <NavigationContainer>
        <Stack.Navigator >
           <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
       </Stack.Navigator>
      </NavigationContainer>
  
    )
  }
}

export default Main