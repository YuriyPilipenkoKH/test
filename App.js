import { useFonts } from "expo-font";
import { StyleSheet, View ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
import LoginScreen from "./components/LoginScreen/LoginScreen";
import Home from "./components/Home/Home";



const Stack = createNativeStackNavigator();

export default function App() {


  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
});

if (!fontsLoaded) {
    return null;
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
        <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
        <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  position: 'relative',
  fontFamily: 'Roboto',
  flex:1,
  },
});
