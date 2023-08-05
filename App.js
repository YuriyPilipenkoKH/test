import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/Main/Main";
import 'intl-pluralrules';
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import enTranslation from './locales/en.json'
import uaTranslation from './locales/ua.json'


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
});

if (!fontsLoaded) {
    return null;
}

i18n.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
      en: { translation: enTranslation },
      ua: { translation: uaTranslation },
    },
  });



return (
    <Provider store={store }>
         <I18nextProvider i18n={i18n}>
           <Main/>
         </I18nextProvider>
    </Provider>
)
}
