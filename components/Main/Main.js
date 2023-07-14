import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import LoginScreen from '../LoginScreen/LoginScreen';
import Home from '../Home/Home';
import RegistrationScreen from '../RegistrationScreen/RegistrationScreen';


import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../../redux/auth/authOperations';
import { useAuth } from '../../redux/auth/authSelectors';


const Stack = createNativeStackNavigator();

const Main = () => {
  // const { stateChange } = useAuth()

    // const state = useSelector((state) => state)
    const { userId } = useAuth();

    // console.log('state:', state)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(authStateChangeUser());
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