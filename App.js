import { useFonts } from "expo-font";
import { StyleSheet, View ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
import LoginScreen from "./components/LoginScreen/LoginScreen";
import PostsScreen from "./components/PostsScreen/PostsScreen";
import CreatePostsScreen from "./components/CreatePostsScreen/CreatePostsScreen";
import CommentsScreen from "./components/CommentsScreen/CommentsScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
});

if (!fontsLoaded) {
    return null;
}

  return (
    <NavigationContainer>
      <Stack.Navigator>
     
        <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
        <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
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
