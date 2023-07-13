import { useFonts } from "expo-font";
// import { StyleSheet, View ,Text} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
// import LoginScreen from "./components/LoginScreen/LoginScreen";
// import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Main from "./components/Main/Main";
// import firebase from 'firebase/app';
// import 'firebase/auth';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {

  }, []);


  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
});

if (!fontsLoaded) {
    return null;
}

return (
    <Provider store={store }>
        <Main/>
    </Provider>

)


}


// if(!isAuth){
//   return (
//     <Provider store={store }>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
//       <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
      
//         </Stack.Navigator>
//     </NavigationContainer>
//   </Provider>
//   )
// }
// else {
//   return (
//     <Provider store={store }>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
//         </Stack.Navigator>
//     </NavigationContainer>
//   </Provider>
//   )
// }



// const styles = StyleSheet.create({
//   container: {
//   position: 'relative',
//   fontFamily: 'Roboto',
//   flex:1,
//   },
// });
