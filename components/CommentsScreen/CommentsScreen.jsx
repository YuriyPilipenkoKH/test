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
    TouchableHighlight
 
} from "react-native";


// import CustomStatusBar from "../CustomStatusBar/CustomStatusBar";
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { styles as creStyles} from "../CreatePostsScreen/CreatePostsScreen";

import { AntDesign } from '@expo/vector-icons'; 

// import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
// import BgImage3 from "../../assets/img/house.jpg";
import AvImage1 from "../../assets/img/city.png";
import AvImage0 from "../../assets/img/userAv.png";


const CommentsScreen =() => {

    return (
        <View style = {[regStyles.background, postStyles.background]}>
        {/* <CustomStatusBar style = {styles.statusBar}/> */}

        <View style = {creStyles.postsCreate}>
        <View style={postStyles.titleWrapp}>
            <Text style={postStyles.title}>
            Коментарі
            </Text>
            <TouchableOpacity style={creStyles.arrowleftBtn}>
            <AntDesign style = {creStyles.arrowleft} name="arrowleft" size={24} color="#212121" />
            </TouchableOpacity>
        </View>

        <View style={[postStyles.main, styles.main]}>
            <View style = {styles.photoWrapp}>
            <ImageBackground style = {postStyles.photoFrame} source={BgImage2}>     
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
            <TouchableHighlight style={styles.sendBtn}>
            <AntDesign style = {styles.arrowup} name="arrowleft" size={18} />
           </TouchableHighlight>

           </View>
        </View>


        </View>
        </View>
        
    )
}
export default CommentsScreen

const styles = StyleSheet.create({

    main: {     
        flex: 1,
        alignSelf: 'stretch', // Stretch the main content to fill the width
 
    },

    photoWrapp: {
        width: 343,
     
        flexDirection: 'column',
        gap: 8,
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
        // borderRadius: '50%',
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
        // alignSelf: 'flex-end',
    },
    text: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
    },
    commemtBar: {
        position: 'relative',
        // alignSelf: 'center',
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



    },
    sendBtn: {
        position: 'absolute',
        right: 8,
        top: 8,
        width:34,
        height: 34,
        backgroundColor: '#ff6c00',
        // borderRadius: '50%',
        alignItems: 'center',
        justifyContent: "center",

    },
    arrowup: {
        // transform: 'rotate(90deg)' ,
        color: '#bdbdbd',
    },

})

