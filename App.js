import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/Main/Main";



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
    <Provider store={store }>
        <Main/>
    </Provider>
)
}
