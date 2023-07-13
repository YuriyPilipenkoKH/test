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

const Stack = createNativeStackNavigator();

const Main = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)

    const state = useSelector((state) => state)
    console.log('state:', state)
    const dispatch = useDispatch()

    useEffect(() => {
   auth.onAuthStateChanged((user) => {
    console.log('user->',user)
    setUser(user)
    dispatch(authSlice.actions.updateUserProfile({ 
        email: user.email,
        login: user.displayName,
        userId: user.uid,
    }))
})

    }, []);

  if(!user){
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