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
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import BackgroundImage from "../../assets/img/forest.jpg";


const CreatePostsScreen =() => {

    return (
        <View style = {[regStyles.background, postStyles.background]}>
        <CustomStatusBar style = {styles.statusBar}/>

        <View style = {styles.postsCreate}>
        <View style={postStyles.titleWrapp}>
            <Text style={postStyles.title}>
            Створити публікацію
            </Text>
            <TouchableOpacity style={styles.arrowleftBtn}>
            <AntDesign style = {styles.arrowleft} name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View style={[postStyles.main, styles.main]}>
            <View style = {styles.photoWrapp}>
            <ImageBackground style = {postStyles.photoFrame} source={BackgroundImage}>
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
            <TouchableOpacity style={regStyles.regBtn}>
              <Text style={regStyles.regBtn__text}>Опубліковати</Text>
            </TouchableOpacity>
           
        </View>

        <View style = {postStyles.footer}>

        <TouchableOpacity style={[postStyles.addBtn, styles.deleteBtn]}>
             <AntDesign style={styles.icoDelete} name="delete" size={24} color="#bdbdbd" />
        </TouchableOpacity>

        </View>
           <View style = {regStyles.homeIndicator} ></View>
        </View>
        </View>
        
    )
}
export default CreatePostsScreen

export const styles = StyleSheet.create({


    postsCreate: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        gap: 32,
        height: '100%',
        alignItems: 'flex-start', // Align items to the start (top) of the container
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
    },

    photoWrapp: {
        width: 343,
        flexDirection: 'column',
        gap: 8,
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

      icon: {
        padding:12,
      },
      deleteBtn: {

        backgroundColor: '#f6f6f6',
       
      },

})

