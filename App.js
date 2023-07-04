import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
      <Text>Open up App.Movin` ON!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  fontFamily: 'Roboto',
  flex:1,
  },
});
