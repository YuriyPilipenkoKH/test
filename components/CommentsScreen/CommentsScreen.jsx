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
    TouchableHighlight
 
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { styles as creStyles} from "../CreatePostsScreen/CreatePostsScreen";
import { AntDesign } from '@expo/vector-icons'; 
// import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
// import BgImage3 from "../../assets/img/house.jpg";
import AvImage1 from "../../assets/img/city.png";
import AvImage0 from "../../assets/img/userAv.png";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";


const CommentsScreen =({route}) => {
    const {postId} = route.params;
    const navigation = useNavigation();
    const { login }= useAuth() 
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [isValidComment, setIsValidComment] = useState(false)
    const [message, setMessage] = useState('')



    
    const validateComment = (value) => {
        setComment(value)
        if(!value){
            setIsValidComment(false)
        }
        else {
            setIsValidComment(true);
            setMessage('')
          }
    }

    const createComment = async () => {
        if(!isValidComment){
            setMessage('Comment shouldn`t be empty string')
            return
          }
          

        await addDoc(collection(db, `posts/${postId}/comments`), {
            comment: comment,
            userName: login
          });
        
          setComment('');

        // db.firestore()
        //   .collection('posts')  
        //   .doc(postId)
        //   .collection('comments')  
        //   .add({comment, userName: login})

        };

    
        const getAllComments = async (postId) => {
            const commentsRef = collection(db, `posts/${postId}/comments`);
            const querySnapshot = await getDocs(commentsRef);
            const comments = [];
          
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
            //   comments.push(doc.data());
            });
          
            setAllComments(comments) ;
          };    

          useEffect(() => {
            getAllComments()  
         }, [comment]);  
    

    return (
        <View style = {[regStyles.background, postStyles.background]}>
        <StatusBar style="auto" /> 

        <View style = {[creStyles.postsCreate, styles.container]}>
        <View style={postStyles.titleWrapp}>
            <Text 
            onPress={() => console.log(allComments)}
            style={postStyles.title}>
            Коментарі
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Posts")}
            style={creStyles.arrowleftBtn}>
            <AntDesign style = {creStyles.arrowleft} name="arrowleft" size={24} color="#212121" />
            </TouchableOpacity>
        </View>

        <ScrollView  style={[ styles.main]}>
            <View style = {[styles.photoWrapp]}>
            <ImageBackground style = {postStyles.photoFrame} source={BgImage2}>     
            </ImageBackground>    
            </View>

        <View style = {[styles.commentsWrapp]}>  
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
        </ScrollView>

        {message ?  <Text style={{...regStyles.errorMessage, }}>{message}</Text>         
                 :  null}

        <View style = {[styles.commemtBar]} >
           <TextInput
                style={[styles.commemtInput]}
                name = 'comment'
                value={comment}
                onChangeText={validateComment}
                placeholder="Коментувати..."
                placeholderTextColor="#bdbdbd"
                    />
            <TouchableOpacity
            onPress={createComment}
            style={styles.sendBtn}>
            <AntDesign style = {styles.arrowup} name="arrowleft" size={18} />
           </TouchableOpacity>

           </View>
      
        </View>
        </View>
        
    )
}
export default CommentsScreen

const styles = StyleSheet.create({

    container: {
        gap: 12,

      },
    contentContainer: {
        alignItems: 'center',

      },

    main: {     
        flex: 1,   
        gap: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },

    photoWrapp: {
        width: 343,
        flexDirection: 'column',
        gap: 8,
        marginBottom:20,
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
        borderRadius: 14,
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
  
        width: 343,
        height: 50,
        marginBottom:20,
        // marginTop: -10,
    
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
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: "center",

    },
    arrowup: {
        transform: [{ rotate: '90deg' }],
        color: '#bdbdbd',
    },

})

