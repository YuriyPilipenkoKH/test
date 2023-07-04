import { useFonts } from "expo-font";
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,Text} from 'react-native';
import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
import LoginScreen from "./components/LoginScreen/LoginScreen";
import PostsScreen from "./components/PostsScreen/PostsScreen";
import CreatePostsScreen from "./components/CreatePostsScreen/CreatePostsScreen";
import CommentsScreen from "./components/CommentsScreen/CommentsScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
});

if (!fontsLoaded) {
    return null;
}

  return (
    <View style={styles.container}>
      <PostsScreen/>
   
     {/* <StatusBar style="auto" />  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  fontFamily: 'Roboto',
  backgroundColor: '#f5f5f5',
  flex:1,
  },
});
