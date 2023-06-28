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

import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
import BgImage3 from "../../assets/img/house.jpg";
import AvImage1 from "../../assets/img/city.png";
import AvImage0 from "../../assets/img/userAv.png";


const CommentsScreen =() => {

    return (
        <View style = {styles.background}>
        <CustomStatusBar style = {styles.statusBar}/>

        <View style = {styles.postsCreate}>
        <View style={styles.titleWrapp}>
            <Text style={styles.title}>
            Коментарі
            </Text>
            <TouchableOpacity style={styles.arrowleftBtn}>
            <AntDesign style = {styles.arrowleft} name="arrowleft" size={24} color="#212121" />
            </TouchableOpacity>
        </View>

        <View style={styles.main}>
            <View style = {styles.photoWrapp}>
            <ImageBackground style = {styles.photoFrame} source={BgImage2}>     
            </ImageBackground>    
            </View>

        <View style = {styles.commentsWrapp}>  
            <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage1} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!</Text>
                <Text style = {styles.createdAt}> 09 червня, 2020 | 08:40</Text>
            </View> 
            </View>

            <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage0} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.</Text>
                <Text style = {styles.createdAt}> 09 червня, 2020 | 09:14</Text>
            </View> 
            </View>

            <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage1} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>Thank you! That was very helpful!</Text>
                <Text style = {styles.createdAt}>09 червня, 2020 | 09:20</Text>
            </View> 
            </View>

        </View>   
        <View style = {styles.commemtBar} >
           <TextInput
                style={[styles.commemtInput]}
                placeholder="Коментувати..."
                placeholderTextColor="#bdbdbd"
                    />
            <TouchableOpacity style={styles.sendBtn}>
            <AntDesign style = {styles.arrowup} name="arrowleft" size={18} />
           </TouchableOpacity>

           </View>
        </View>


        </View>
        </View>
        
    )
}
export default CommentsScreen

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
    commentsWrapp: {
        flexDirection: 'column',
        gap:24,
    },
    comment: {
        flexDirection: 'row',
        gap: 8,
    },
    avatar: {
        width:28,
        height: 28,
        backgroundColor: '#bdbdbd',
        borderRadius: '50%',
    },
    card: {
        width: 300,
        padding: 16,
        flexDirection: 'column',
        gap: 8,
        backgroundColor: '#f7f7f7',
   
        borderTopLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        
    },
    commentText: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: 400,
    },
    createdAt: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: 500,
        alignSelf: 'flex-end',
    },
    text: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
    },
    commemtBar: {
        position: 'relative',
        alignSelf: 'center',
        width: 343,
        height: 50,

    },
    commemtInput: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 50,
        backgroundColor: '#f6f6f6',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#bdbdbd",

        outlineColor: 'orange', // Outline color when focused
        outlineWidth: 1, // Outline width when focused

    },
    sendBtn: {
        position: 'absolute',
        right: 8,
        top: 8,
        width:34,
        height: 34,
        backgroundColor: '#ff6c00',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: "center",

    },
    arrowup: {
        transform: 'rotate(90deg)' ,
        color: '#bdbdbd',
    },

})

