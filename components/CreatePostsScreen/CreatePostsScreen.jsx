import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
 
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
// import BgImage1 from "../../assets/img/sea.jpg";
import BgImage2 from "../../assets/img/react-js-native.jpg";
import {addData , getData} from "../utils/dataStorage";


const CreatePostsScreen =() => {
    const [snap, setsnap] = useState(null)
    const [photo, setPhoto] = useState('')
    const [naming, setNaming] = useState('')
    const [location, setLocation] = useState('')
    const [gps, setGps] = useState(null)
    const [isValidNaming, setIsValidNaming] = useState(false)
    const [isValidLocation, setIsValidLocation] = useState(false)
    const [message, setMessage] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
   
    const navigation = useNavigation();

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

      


    const takePicture = async () => {
        
        if (snap) {
            let { uri } = await snap.takePictureAsync()
            // await MediaLibrary.createAssetAsync(uri);
            setPhoto(uri) 
            // console.log(uri)

            let locationUser =
            await Location.requestForegroundPermissionsAsync();
        if (locationUser.status !== "granted") {
            console.log("Permission to access location was denied");
        }

            let locality = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: locality.coords.latitude,
                longitude: locality.coords.longitude,
            };
            setGps(coords)
        }

    }

    const reset = () => {
       
        setPhoto('')
        setNaming('')
        setLocation('')
        setGps(null)
        setIsValidNaming(false)
        setIsValidLocation(false)
        setMessage('')
    }

    const validateNaming = (value) => {
        setNaming(value)
        if(!value){
            setIsValidNaming(false)
        }
        else {
            setIsValidNaming(true);
          }
    }
    const validateLocation = (value) => {
        setLocation(value)
        if(!value){
           setIsValidLocation(false)
        }
        setIsValidLocation(true)
    }
    const publish = (value) => {

        if(!photo){
            setMessage('Take some picture')
            return
          }
        if(!isValidNaming){
            setMessage('Enter photo name')
            return
          }
          if(!isValidLocation){
            setMessage('Enter your current location')
            return
          }
          const data = {
            id: getData().length + 1,
            photo, 
            naming,
            location,
            gps,
        }
        //  console.log(data)
         navigation.navigate('Posts', {data})
         addData(data); // Write data to dataStorage.js
         reset()
    }

  
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {[regStyles.background, postStyles.background]}>
                 <StatusBar style="auto" />

            <View style = {styles.postsCreate}>
            <View style={postStyles.titleWrapp}>
                <Text style={postStyles.title}>
                Створити публікацію
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Posts")}
                style={styles.arrowleftBtn}>
                <AntDesign style = {styles.arrowleft} name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer} style={[ styles.main]}>
                <View  style = {{...styles.photoWrapp, 
                  height: keyboardVisible ? 270 : 280,
                  paddingTop: keyboardVisible ? 8 : 10,
                  paddingBottom: keyboardVisible ? 8 : 10,
               }}>
                <Camera
                ref={setsnap}
                style = {[postStyles.photoFrame, ]} >
                    <ImageBackground source={!photo ? BgImage2 :{uri: photo}} style = {[styles.camera,]}>
                        <TouchableOpacity
                        onPress={takePicture}
                         style = {styles.cameraBtn}>
                          <MaterialIcons name="photo-camera" size={24} color="#777" />
                        </TouchableOpacity>
                    </ImageBackground>
                </Camera>
                <Text
                // onPress={() => getData()}
                style={styles.text}>{!photo ? 'Завантажте фото' : 'Редагувати фото'}</Text>
                </View>
                <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height" } 
                style = {styles.inputWrapp}>
                <TextInput
                    style={[styles.input]}
                    name = 'naming'
                    value={naming}
                    onChangeText = {validateNaming}
                    placeholder="Назва..."
                    placeholderTextColor={"#BDBDBD"}
                        />
                <View>
                    <TextInput
                        style={[styles.input, styles.location]}
                        name = 'location'
                        value={location}
                        onChangeText = {validateLocation}
                        placeholder="Місцевість..."
                        placeholderTextColor={"#BDBDBD"}
                            />
                         <Feather style = {{...styles.iconMap,
                        }}
                         name="map-pin" size={24} color="black" />
                </View>
                {message ?  <Text style={{...regStyles.errorMessage, ...styles.errorMessage,
                bottom: keyboardVisible ? -60 : -16,
                }}>{message}</Text>         
               :  null}
                </KeyboardAvoidingView>


                <TouchableOpacity
                onPress={publish}
                 style={{...regStyles.regBtn, ...styles.publishBtn,
                    backgroundColor:  photo ? '#ff6c00' : '#D6D6D6',
                    marginTop: keyboardVisible ? 75 : 44,
                }} >
                  <Text style={[regStyles.regBtn__text, styles.publishBtn__text]}>Опубліковати</Text>
                </TouchableOpacity>
            
            </ScrollView>
            {!keyboardVisible && <View style = {[postStyles.footer]}>
            <TouchableOpacity
            onPress={reset}
            style={[postStyles.addBtn, styles.deleteBtn]}>
                 <AntDesign style={styles.icoDelete} name="delete" size={24} color="#bdbdbd" />
            </TouchableOpacity>
            </View>}
             { !keyboardVisible && <View style = {regStyles.homeIndicator} ></View>}
            </View>
            </View>
        </TouchableWithoutFeedback>
        
    )
}
export default CreatePostsScreen

export const styles = StyleSheet.create({


    postsCreate: {
        flex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center', 
        gap: 10,
        height: '100%',
       
    },
    contentContainer: {
        alignItems: 'center',
      
      },

    arrowleftBtn: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -180 }],
    },
    arrowleft: {  
        color: '#212121',
    },
    main: {       
        flex: 1,
        alignSelf: 'stretch', // Stretch the main content to fill the width
        gap: 32,
        paddingBottom:60,
    },

    photoWrapp: {
        position: 'relative',
        width: 343,
        height: 270,
        gap:10,
    },
   camera: {
    flex: 1,
    width: 343,
    height: 260,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    resizeMode: 'contain',
    },

    cameraBtn: {

        width: 60,
        height: 60,
        backgroundColor: '#7a799f99',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
     
    },
    errorMessage: {
        position: 'absolute',
        bottom: -16,
     
    },

    inputWrapp: {
        marginTop:20,
        position: 'relative',
        width: 343,
        flexDirection: 'column',
        gap: 24,
       
    },
    input: {
        width: 343,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#777',
 

    },
    location: {
        paddingLeft: 30,
    },
    iconMap: {
        position: 'absolute',
        bottom: 12,
        color: '#bdbdbd',
    },


    publishBtn: {
        
        
    },
    publishBtn__text: {
        color: '#F6F6F6',
        
    },
    footer: {
        color: '#F6F6F6',
    },

      icon: {
        padding:12,
      },
      deleteBtn: {

        backgroundColor: '#f6f6f6',
       
      },

})

