import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    ImageBackground,
 
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import BackgroundImage from "../../assets/img/forest.jpg";
import { useNavigation } from "@react-navigation/native";


const CreatePostsScreen =() => {
    const navigation = useNavigation();

    return (
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
                placeholderTextColor={"#BDBDBD"}
    
                    />
            <TextInput
                style={[styles.input, styles.location]}
                placeholder="Місцевість..."
                placeholderTextColor={"#BDBDBD"}
                
                    />
                 <Feather style = {styles.iconMap} name="map-pin" size={24} color="black" />    
            </View>
            <TouchableOpacity style={[regStyles.regBtn, styles.publishBtn]}>
              <Text style={[regStyles.regBtn__text, styles.publishBtn__text]}>Опубліковати</Text>
            </TouchableOpacity>
           
        </ScrollView>

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

        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center', 
        gap: 32,
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
        width: 343,
        flexDirection: 'column',
        gap: 8,
    },

    cameraBg: {
        width: 60,
        height: 60,
        backgroundColor: '#fff3',
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
    inputWrapp: {
        marginTop:20,
        position: 'relative',
        width: 343,
        flexDirection: 'column',
        gap: 32,
       
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
        bottom:42,
        color: '#bdbdbd',
    },

    publishBtn: {
        backgroundColor: '#D6D6D6',
    },
    publishBtn__text: {
        color: '#F6F6F6',
    },

      icon: {
        padding:12,
      },
      deleteBtn: {

        backgroundColor: '#f6f6f6',
       
      },

})

