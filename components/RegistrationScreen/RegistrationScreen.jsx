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
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import BackgroundImage from "../../assets/img/photo-bg.jpg";

import User from "../../assets/img/avatar/av-252.png";
import { useNavigation } from "@react-navigation/native";
import { resetData } from "../../utils/dataStorage";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { register } from "../../redux/auth/authOperations";
import { storage } from "../../firebase/config";
import Loader from "../Loader/Loader";
import { toggleTheme } from "../../redux/themeSlice";
import { lightTheme, darkTheme } from "../../utils/themes";
import { getTheme } from "../../redux/auth/authSelectors";
import { getLang } from "../../redux/selectors";
import { toggleLang } from "../../redux/langSlice";
import { useTranslation } from "react-i18next";


const RegistrationScreen =() => {
  const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [isValidName, setIsValidName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null)
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

// Language
const handleLanguageChange = () => {

  i18n.changeLanguage(lang === 'english' ? 'en' : 'ua');
};

useEffect(() => {
  handleLanguageChange()
}, [lang])

    useEffect(() => {
      if(message){
        setTime(5)
        setTimeout(() => {
          setTime(null)
        }, 5000);
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

    useEffect(() => {
      (async () => {
        setLoading(true);
        try {
          if (Platform.OS !== "web") {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === "granted");
            if (status !== "granted") {
              console.log(
                "Sorry, we need camera roll permissions to make this work!"
              );
            }
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      })();
    }, []);

    const validateName = (value) => {
      setLogin(value)
      const pattern =/^[a-zA-Z' -]+$/
      if (pattern.test(value) === false) {
        setIsValidName(false);
    }
    else {
      setIsValidName(true);
    }
    }

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

    const uploadAvatarFromGallery = async () => {
      setLoading(true);
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
  
        if (!result.canceled) {
          setAvatar(result.assets[0].uri);
          console.log('Avatar Uploaded ',result)
        }
        setLoading(false);
      } catch (error) {
        console.log("Upload avatar error", error.message);
        setLoading(false);
        setError(`Upload avatar error ${error.message}`);
      }
    };
  

    const uploadAvatarToServer = async () => {
      setLoading(true);
      try {
        const response = await fetch(avatar);
        const file = await response.blob();
  
        const avatarId = Date.now().toString();
  
        const storageRef = ref(storage, `avatars/${avatarId}`);
        await uploadBytes(storageRef, file);
  
        const avatarRef = await getDownloadURL(storageRef);
        return avatarRef;
      } catch (error) {
        console.log("Upload avatar to server error", error.message);
        setLoading(false);
        setError(`Upload avatar to server error ${error.message}`);
      }
    };

     const submit = async () => {
      if(!isValidName){
        setMessage('Not valid login')
        return
      }
      if(!isValidEmail){
        setMessage('Not valid email')
        return
      }
      if(!isValidPassword){
        setMessage('Not valid password')
        return
      }
      const userData = {
        login, 
        email, 
        password,
       
    }
      
      setLoading(true);

      try {
        const avatarRef = await uploadAvatarToServer();

        setLogin('')
        setEmail('')
        setPassword('')
        setShow(false)
        setMessage('')
        setIsValidName(false)
        setIsValidEmail(false)
        setIsValidPassword(false)
        resetData()

        dispatch(register({ ...userData,
           avatar: avatarRef ,
          }));     

        setLoading(false);
      } catch (error) {
        console.log("Upload avatar to server error", error.message);
        setLoading(false);
        setError(`Upload avatar to server error ${error.message}`);
      }

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground style = {styles.background} source={BackgroundImage}>
          <StatusBar barStyle="light-content" /> 

       <View style = {{...styles.main,
         height: keyboardVisible ? 360 : 500,
         backgroundColor: mode.backgroundColor ,
         }}>

        <ImageBackground style = {[styles.photoWrapp, styles.photoFrame]} source={User}> 
        <TouchableOpacity 
        onPress={uploadAvatarFromGallery}
        style = {styles.plusBtn}>
            <AntDesign  name="pluscircleo" size={25} style = {[styles.plus]} />
        </TouchableOpacity>
         </ImageBackground>

         <TouchableOpacity 
            onPress={() => {
                dispatch(toggleTheme())}}
              style={[styles.themeBtn, styles.themeBtn]}>
            <MaterialCommunityIcons 
              style = {[styles.themeIcon, {color: mode.textColor }]}
              name= {theme === 'light'? "lightbulb-on-outline" : "moon-waning-crescent"} 
               size={24} />
         </TouchableOpacity>  
         <View style={styles.langWrapp}>
           <TouchableOpacity
              onPress={() => {
                  dispatch(toggleLang())}}
                style={[styles.langBtn]}>
              <MaterialIcons
                style = {[styles.langIcon, {color: mode.textColor }]}
                name="language"
                 size={30} />
            </TouchableOpacity>
            <Text style={[styles.text, {color: mode.textColor }]}>
              {lang === 'english' ? 'EN' : 'UA'}
              </Text>
         </View>

    <Text style={{...styles.title, 
      color: time ? 'crimson' :  mode.textColor  }}>
   {message && time ? 'Wasted' : t('regTitle') }
    </Text>
   
    <View style={styles.form} > 
    <KeyboardAvoidingView
     style={styles.inputs}
     behavior={Platform.OS == "ios" ? "padding" : "height" } 
     >
      <TextInput
        style={styles.input}
        name = 'login'
        value={login}
        onChangeText = {validateName}
        placeholder={t('login')}
        placeholderTextColor="#bdbdbd"

      />
      <TextInput
        style={styles.input}
        name = 'email'
        value={email}
        onChangeText = {validateEmail}
        placeholder={t('email')}
        placeholderTextColor="#bdbdbd"

      />
      <View style = {styles.inputWrapp}>
          <TextInput
            style={styles.input}
            name = 'password'
            value={password}
            onChangeText = {validatePassword}
            placeholder={t('password')}
            placeholderTextColor="#bdbdbd"
            secureTextEntry={!show}
          />
         
          <TouchableOpacity   style={styles.showPassword} onPress={() => setShow(!show)} >
                    <Text style={styles.textShow}>
                    {show ? t('hide') : t('show')}
                    </Text>
            </TouchableOpacity>
      </View>
      {message ?  <Text style={styles.errorMessage}>{message}</Text>         
               :  null}
      </KeyboardAvoidingView>
     
    {!keyboardVisible && <View style={styles.btnWrapp}>
    <TouchableOpacity
    onPress={() => navigation.navigate("Login")}
     style={styles.alreadyHaveAccount}>
        <Text style={[styles.alreadyHaveAccountText, 
        {color: mode.already }
        ]}>{t('alreadyGot')}</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.regBtn}
        onPress={submit}
      >
        <Text style={styles.regBtn__text}>
          { t('regSubmit') }
          </Text>
      </TouchableOpacity>
    </View>}
    </View>

    {loading && <Loader/>} 
    <View style = {{...styles.homeIndicator, 
      backgroundColor: keyboardVisible ? '#fff0' : '#212121',}} ></View>
    </View>
  

      </ImageBackground>
       </TouchableWithoutFeedback>
    )
}
export default  RegistrationScreen

export const styles = StyleSheet.create({
    background: {

        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',

        justifyContent: 'flex-end',
    },



    main: {
        position: 'relative',
 
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
   
        backgroundColor:  '#fff',
        width: '100%',
        height: 500,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        paddingTop: 72,
        paddingBottom: 40,
        paddingHorizontal:16,
    },
    photoWrapp: {
        position: 'absolute',
        top: -60,
        transform: [{ translateX: 4 }, { translateY: 0 }],

        width: 120,
        height: 120,
        backgroundColor: '#f6f6f6',
        borderRadius: 16,

    },
    photoFrame: {
      borderWidth: 2,
      borderColor: "#bdbdbd",
      borderStyle: 'solid',
  

    },
    plusBtn: {
        position: 'absolute',
        top: 70,
        right: -10,
    },
    themeBtn: {
      position: 'absolute',
      left: 25,
      top: 25,
      // transform: [{ translateX: 160 }],
     
  },
  themeIcon: {
      // transform: [{ rotate: '90deg' }],
      color: '#212121',

  },
  langWrapp: {
    position: 'absolute',
    right: 25,
    top: 20,
    flex: 1,
    gap: 3,
    alignItems: 'center',

  },
  langBtn: {

  },
    plus: {
        color: '#FF6C00',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    title: {
      
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 500,
        textAlign: 'center',
    },
    inputs: {
            gap: 16,

    },
    input: {
        width: 343,
        height: 50,
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        padding: 16,
        color: '#212121',
        borderWidth: 1,
        borderColor: "#bdbdbd",
        textDecorationLine: 'none',
    },

    errorMessage: {
      color: 'crimson',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight:800,
      marginHorizontal:20,
    },
    alreadyHaveAccount: {
        padding: 2,
        textAlign: 'center',
       
    },
    alreadyHaveAccountText: {
        color: '#1B4371',
        fontFamily: 'Roboto',
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        flex: 2,
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        justifyContent:  'flex-start',
    },
    btnWrapp: {
        flex: 1,
        flexDirection: 'column-reverse',
        gap: 16,
        ...Platform.select({
            ios: {

            },
            android: {

            },
        }),
        
    },
    regBtn: {
         
        backgroundColor: '#FF6C00',
        height: 51,
        width: 343,
        borderRadius: 25,
        padding: 6,
        alignItems: 'center',
        justifyContent:  'center',
    
    },
    regBtn__text: {
        color: '#eee',
        fontFamily: 'Roboto',
        fontSize: 18,
        textAlign: 'center',

    },
    inputWrapp: {
        position: 'relative',
    },
    showPassword: {
        position: 'absolute',
        top: 15,
        right: 16,

    },
    textShow: {
        fontFamily: 'Roboto',
        color: '#1B4371',
        fontSize: 16,
    },
    homeIndicator : {
        position: "absolute",
        bottom: 10,
        width: 134,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#212121',
    
    },
    custom: {
        backgroundColor: '#ff2',
    },
  });