import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,

} from "react-native";
import { StatusBar } from 'expo-status-bar';
import BackgroundImage from "../../assets/img/photo-bg.jpg";
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { resetData } from "../../utils/dataStorage";
import { signIn } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { lightTheme , darkTheme, toggleMode} from "../../utils/themes";
import { getTheme } from "../../redux/auth/authSelectors";
import { getLang } from "../../redux/selectors";
import { useTranslation } from "react-i18next";

const LoginScreen =() => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [mode, setMode] = useState(lightTheme)

  const [time, setTime] = useState(null)
   const navigation = useNavigation();
   const dispatch = useDispatch()
   const theme = useSelector(getTheme)
   const lang = useSelector(getLang)
   const { t } = useTranslation();
   const { i18n } = useTranslation();

       // Theme
  const toggleMode = () => {
  setMode(theme === 'light' ? lightTheme : darkTheme);
  };
  useEffect(() => {
    toggleMode()
  }, [theme])

  useEffect(() => {
    if(message){
      setTime(4)
      setTimeout(() => {
        setTime(null)
      }, 4000);
    }
  }, [message])
  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateEmail = (value) => {
    setEmail(value)
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (pattern.test(value) === false) {
      setIsValidEmail(false);
  }
  else {
    setIsValidEmail(true);
  }
  }

  const validatePassword = (value) => {
    setPassword(value)
    const pattern =  /^.{6,}$/
    if (pattern.test(value) === false) {
      setIsValidPassword(false);
  }
  else {
    setIsValidPassword(true);
  }
  }

  const submit = async() => {
    if(!isValidEmail){
      setMessage('Not valid email')
      return
    }
    if(!isValidPassword){
      setMessage('Not valid password')
      return
    }


    const userData = {
        email, 
        password,
    }

    setLoading(true);
    try {
      
      setEmail('')
      setPassword('')
      setShow(false)
      setMessage('')
      setIsValidEmail(false)
      setIsValidPassword(false)
      resetData()
  
  
       dispatch(signIn(userData));
       setLoading(false);
    } 
    catch (error) {
      console.log("Login failed", error.message);
      setLoading(false);
    }

}


  return  (            
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
  <ImageBackground style = {[regStyles.background, styles.background]} source={BackgroundImage}>
      <StatusBar style="auto" /> 

  <View style = {{...regStyles.main, ...styles.main,
  height: keyboardVisible ? 330 : 440,
  paddingTop: keyboardVisible ? 20 : 60,
  paddingBottom: keyboardVisible ? 8 : 60,
  backgroundColor: mode.backgroundColor ,
  }}>

   
  <Text style={{...regStyles.title, color: time ? 'crimson' : mode.textColor }}>
   {message && time ? 'Wasted' :  t('logTitle') }
    </Text>

  <View style={regStyles.form}>
  <KeyboardAvoidingView
     style={regStyles.inputs}
     behavior={Platform.OS == "ios" ? "padding" : "height" } 
     >
    <TextInput
      style={regStyles.input}
      name = 'email'
      value={email}
      onChangeText = {validateEmail}
      placeholder="Адреса електронної пошти"
      placeholderTextColor="#bdbdbd"

    />
    <View style = {regStyles.inputWrapp}>
        <TextInput
          style={regStyles.input}
          name = 'password'
          value={password}
          onChangeText = {validatePassword}
          placeholder="Пароль"
          placeholderTextColor="#bdbdbd"
          secureTextEntry={!show}
        />
        <TouchableOpacity   style={regStyles.showPassword} onPress={() => setShow(!show)} >
                  <Text style={regStyles.textShow}>
                  {show ? t('hide') : t('show')}
                  </Text>
          </TouchableOpacity>
    </View>
    {message ?  <Text style={regStyles.errorMessage}>{message}</Text>         
               :  null}
    </KeyboardAvoidingView>

  <View style={regStyles.btnWrapp}>
  <TouchableOpacity 
  onPress={() => navigation.navigate("Registration")}
  style={regStyles.alreadyHaveAccount}>
      <Text style={[regStyles.alreadyHaveAccountText, {color: mode.already }]}>
      { t('notYet') }
        </Text>
    </TouchableOpacity>
    <TouchableOpacity style={regStyles.regBtn}
     onPress={submit}
     >
      <Text style={regStyles.regBtn__text}>
      { t('logSubmit') }
        </Text>
    </TouchableOpacity>

  </View>
  </View>

  {loading && <Loader/>} 
   <View style = {{...regStyles.homeIndicator,  backgroundColor: keyboardVisible ? '#fff0' : '#212121'}} ></View>
  </View>
      

    </ImageBackground>
    </TouchableWithoutFeedback>
  )
}
export default  LoginScreen

export const styles = StyleSheet.create({

  background: {
  
  },
  main: {


  },
});