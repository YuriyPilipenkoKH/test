// import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    ImageBackground,
 
} from "react-native";
import BackgroundImage from "../../assets/img/photo-bg.jpg";
import CustomStatusBar from "../CustomStatusBar/CustomStatusBar";
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";

const LoginScreen =() => {


    return (
        <ImageBackground style = {regStyles.background} source={BackgroundImage}>
            <CustomStatusBar/>

    <View style = {[regStyles.main, styles.main]}>

     
    <Text style={regStyles.title}>Увійти</Text>

    <View style={regStyles.form}>

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
            // secureTextEntry={true}
          />
          <TouchableOpacity   style={regStyles.showPassword}  >
                    <Text style={regStyles.textShow}>
                            Показати
                    </Text>
            </TouchableOpacity>
      </View>
    <View style={regStyles.btnWrapp}>
      <TouchableOpacity style={regStyles.regBtn}>
        <Text style={regStyles.regBtn__text}>Увійти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={regStyles.alreadyHaveAccount}>
        <Text style={regStyles.alreadyHaveAccountText}>Немає акаунту? Зареєструватися</Text>
      </TouchableOpacity>
    </View>

    </View>
     <View style = {regStyles.homeIndicator} ></View>
    </View>
        

      </ImageBackground>
    )
}
export default  LoginScreen

export const styles = StyleSheet.create({

    main: {
        height: 489,
    },
  });