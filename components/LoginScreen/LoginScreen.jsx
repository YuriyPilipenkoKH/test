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

const LoginScreen =() => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [show, setShow] = useState(false);

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


  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
  <ImageBackground style = {[regStyles.background, styles.background]} source={BackgroundImage}>
      <StatusBar style="auto" /> 

  <View style = {{...regStyles.main, ...styles.main,
  height: keyboardVisible ? 280 : 440,
  }}>

   
  <Text style={regStyles.title}>Увійти</Text>

  <View style={regStyles.form}>
  <KeyboardAvoidingView
     style={regStyles.inputs}
     behavior={Platform.OS == "ios" ? "padding" : "height" } 
     >
    <TextInput
      style={regStyles.input}
      placeholder="Адреса електронної пошти"
      placeholderTextColor="#bdbdbd"

    />
    <View style = {regStyles.inputWrapp}>
        <TextInput
          style={regStyles.input}
          placeholder="Пароль"
          placeholderTextColor="#bdbdbd"
          secureTextEntry={show ? false : true}
        />
        <TouchableOpacity   style={regStyles.showPassword} onPress={() => setShow(!show)} >
                  <Text style={regStyles.textShow}>
                  {show ? 'Приховати' : 'Показати'}
                  </Text>
          </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
{ !keyboardVisible &&  <View style={regStyles.btnWrapp}>
  <TouchableOpacity style={regStyles.alreadyHaveAccount}>
      <Text style={regStyles.alreadyHaveAccountText}>Немає акаунту? Зареєструватися</Text>
    </TouchableOpacity>
    <TouchableOpacity style={regStyles.regBtn}>
      <Text style={regStyles.regBtn__text}>Увійти</Text>
    </TouchableOpacity>

  </View>}

  </View>
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

      paddingTop: 62,
      paddingBottom: 60,
  },
});