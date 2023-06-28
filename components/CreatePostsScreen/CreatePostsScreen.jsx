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


import CustomStatusBar from "../CustomStatusBar/CustomStatusBar";
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as logStyles } from "../LoginScreen/LoginScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import BackgroundImage from "../../assets/img/forest.jpg";


const CreatePostsScreen =() => {

    return (
        <View style = {styles.background}>
        <CustomStatusBar style = {styles.statusBar}/>

        <View style = {styles.postsCreate}>
        <View style={styles.titleWrapp}>
            <Text style={styles.title}>
            Створити публікацію
            </Text>
            <TouchableOpacity style={styles.arrowleftBtn}>
            <AntDesign style = {styles.arrowleft} name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View style={styles.main}>
            <View style = {styles.photoWrapp}>
            <ImageBackground style = {styles.photoFrame} source={BackgroundImage}>
                <View style = {styles.cameraBg}>
                <MaterialIcons name="photo-camera" size={24} color="#bdbdbd" />
                </View>
                </ImageBackground>    
            <Text style={styles.text}>Завантажте фото</Text>
            </View>

            <View style = {styles.inputWrapp}>
            <TextInput
                style={[styles.input]}
                placeholder="Назва..."
    
                    />
            <TextInput
                style={[styles.input, styles.location]}
                placeholder="Місцевість..."
                
                    />
                 <Feather style = {styles.iconMap} name="map-pin" size={24} color="black" />    
            </View>
            <TouchableOpacity style={styles.publishBtn}>
              <Text style={styles.publishBtnText}>Опубліковати</Text>
            </TouchableOpacity>
           
        </View>

        <View style = {styles.footer}>

        <TouchableOpacity style={styles.deleteBtn}>
             <AntDesign style={styles.icoDelete} name="delete" size={24} color="#bdbdbd" />
        </TouchableOpacity>

        </View>
           <View style = {styles.homeIndicator} ></View>
        </View>
        </View>
        
    )
}
export default CreatePostsScreen

const styles = StyleSheet.create({
    background: {
        width:'100vw',
        minHeight:'100vh',
       
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    postsCreate: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        gap: 32,
        height: '100%',
        alignItems: 'flex-start', // Align items to the start (top) of the container
    },
    titleWrapp: {
        position: 'relative',
        height: 44,
        width: '100vw',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#777',
        borderBottomStyle: 'solid',
        
    },
    title: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 500,
        textAlign: 'center',
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
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       
        gap: 32,
        paddingLeft: 16,
        paddingRight: 16,
 
    },

    photoWrapp: {
        width: 343,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    photoFrame: {
        width: 343,
        height: 240,
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBg: {
        width: 60,
        height: 60,
        backgroundColor: '#fff3',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
    },
    inputWrapp: {
        position: 'relative',
        width: 343,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        // alignSelf: 'start',
    },
    input: {
        width: 343,
        height: 50,
        placeholderTextColor:"#bdbdbd",
        borderBottomWidth: 1,
        borderBottomColor: '#777',
        borderBottomStyle: 'solid',

        outlineColor: 'transparent', // Outline color when focused
        outlineWidth: 1, // Outline width when focused
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
        backgroundColor: '#FF6C00',
        height: 51,
        width: 343,
        borderRadius: 25,
        padding: 16,
        textAlign: 'center',
        
    },
    publishBtnText: {
        color: '#eee',
        fontFamily: 'Roboto',
        fontSize: 16,
        
    },

      footer: {
        height: 83,
        paddingTop: 9,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#777',
        borderTopStyle: 'solid',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        gap: 32,
        justifyContent: 'center',
        alignItems:'center',
        aligntSelf: 'center',
        
      },
      icon: {
        padding:12,
      },
      deleteBtn: {
        width:70,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
      },
      homeIndicator : {
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        width: 134,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#212121',
        
    },
})

