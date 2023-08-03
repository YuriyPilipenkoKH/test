import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Keyboard,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { styles as creStyles} from "../CreatePostsScreen/CreatePostsScreen";
import { AntDesign } from '@expo/vector-icons'; 
import AvImage0 from "../../assets/img/userAv.png";
import { useNavigation } from "@react-navigation/native";
import { getTheme, useAuth } from "../../redux/auth/authSelectors";

import { useEffect, useState } from "react";
import {  addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { lightTheme, darkTheme } from "../../utils/themes";
import { useSelector } from "react-redux";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import { db } from "../../firebase/config";



const CommentsScreen =({route}) => {
    const {postId, photo} = route.params;

    const navigation = useNavigation();
    const { login }= useAuth() 
    const [comment, setComment] = useState('')
    const [commentId, setCommentId] = useState(null)
    const [allComments, setAllComments] = useState([])
    const [isValidComment, setIsValidComment] = useState(false)
    const [message, setMessage] = useState('')
    const [mode, setMode] = useState(lightTheme)
    const [showConfirm, setShowConfirm] = useState(false);


    const theme = useSelector(getTheme)

    // Theme
  const toggleMode = () => {
    setMode(theme === 'light' ? lightTheme : darkTheme);
  };
  useEffect(() => {
    toggleMode()
  }, [theme])


  const getCommentsCount = async () => {

  try {
  
    const dbRef = collection(db, `posts/${postId}/comments`);
// console.log(dbRef)
      // Set up a real-time listener for the comments collection
      onSnapshot(dbRef, (querySnapshot) => {
        // Get the number of comments in the collection (number of documents)
        const count = querySnapshot.size;
  
        console.log('Number of comments:', count);
      

        const collectionRef = doc(db, "posts", postId)
        // console.log(collectionRef)
         updateDoc(collectionRef, {
            comments: count,
          });

      });
    }
  
  catch (error) {
    console.log('Error fetching comments:', error);
   
  }
    }

    useEffect(() => {    
      getCommentsCount()
}, [postId, commentId]);  //commentId
  

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
            setMessage('Comment shouldn`t be blank')
            return
          }
          validateComment()

          const commentData = {
            comment,
            userName: login,
            timestamp: serverTimestamp(),
          };
        
          const commentRef = await addDoc(
            collection(db, `posts/${postId}/comments`),
            commentData
          );
        
          // Get the newly generated commentId
          const newCommentId = commentRef.id;
        
          // Now, update the commentRef with the newCommentId
          await updateDoc(commentRef, { commentId: newCommentId });
        
          setComment('');
          Keyboard.dismiss()

        // db.firestore()
        //   .collection('posts')  
        //   .doc(postId)
        //   .collection('comments')  
        //   .add({comment, userName: login})

        };

        const deleteComment = async (id) => {

            try {   
              // Create a reference to the comment document
              const commentRef = doc(db, `posts/${postId}/comments/${id}`);//${commentId}
              // console.log('commentRef.path',commentRef.path)
  
              // Delete the comment document from the Firestore
              await deleteDoc(commentRef);        
              // After successful deletion, update the comments state to reflect the changes
            //   setAllComments((prevComments) =>
            //     prevComments.filter((comment) => comment.id !== commentId)
            //   );             
            } catch (error) {
              console.error('Error deleting comment:', error);
            }
          };

    
        const getAllComments = async (postId) => {
   
            try {
                const commentsRef = collection(db, `posts/${postId}/comments`);
                const querySnapshot = await getDocs(commentsRef);
                const comments = []  
    
                querySnapshot.forEach((doc) => {
                    comments.push(doc.data());
                    // console.log('data:', doc.data());
                });
                setTimeout(() => {
                    setAllComments(comments);
                  }, 0);
                        
            } catch (error) {
              console.log('Error fetching comments:', error);
             
            }
         };    

          useEffect(() => {    
                getAllComments(postId);
      
         }, [allComments]);  

        //   useEffect(() => {    
        //     const intervalId = setInterval(() => {
        //         getAllComments(postId);
        //       }, 5000);
            
        //       return () => {
        //         clearInterval(intervalId);
        //       };    
        //  }, [postId]);  

         //confirm
         const handleConfirm = () => {
            // Do something when the user confirms the action
            deleteComment(commentId)
            console.log('Confirmed!');
            setShowConfirm(false);
          };
        
          const handleCancel = () => {
            // Do something when the user cancels the action
            console.log('Cancelled!');
            setShowConfirm(false);
          };
    

    return (
        <View style = {[regStyles.background, postStyles.background, { backgroundColor: mode.backgroundColor}]}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} /> 

        <View style = {[creStyles.postsCreate, styles.container]}>
        <View style={postStyles.titleWrapp}>
            <Text 
      
            style={[postStyles.title, {color: mode.textColor }]}>
            Коментарі
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Posts")}
            style={creStyles.arrowleftBtn}>
            <AntDesign style = {[creStyles.arrowleft, {color: mode.textColor }]} name="arrowleft" size={24} />
            </TouchableOpacity>
        </View>

        <View  style={[ styles.main]}>
            <View style = {[styles.photoWrapp]}>
            <ImageBackground style = {postStyles.photoFrame} source={{uri: photo}}>     
            </ImageBackground>    
            </View>

            {allComments && 
            <FlatList style ={{marginBottom:20, ...styles.commentsWrapp }}
                data={allComments} 
                keyExtractor={(item) => item.commentId} // Use the commentId as the key
                renderItem={({item}) => (

            <View key={item.id} style = {styles.comment}>
            <ImageBackground 
            style = {styles.avatar} source={AvImage0} size = {28}></ImageBackground>   
            <View style = {[styles.card,  { backgroundColor: mode.commentBg}]}>
                <Text
             
                 style = {[styles.commentText, {color: mode.textColor }]}>{item.comment}</Text>
                <Text 
                // onPress={() => console.log("item.commentId", item.commentId)}
                style = {styles.createdAt}>
                  {item.timestamp && moment(item.timestamp.toDate()).format('MMMM/DD/YYYY hh:mm a')}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                    setShowConfirm(true) 
                    setCommentId(item.commentId); // Pass item.commentId to handleConfirm
                  }}
                  style={[ styles.deleteBtn]}>
                 <AntDesign 
                   style={[styles.icoDelete, {color: mode.icon }]}
                   name="delete" size={16} color="#bdbdbd" />
            </TouchableOpacity>
            </View> 
            </View> 

                  )} />  }
        </View>

        <ConfirmPopup
        visible={showConfirm}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        commentId ={allComments}
      />
              
        {message ?  <Text style={{...regStyles.errorMessage, }}>{message}</Text>         
                 :  null}

        <View style = {[styles.commemtBar]} >
           <TextInput
                style={[styles.commemtInput,  { backgroundColor: mode.commentBg,color: mode.textColor}]}
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
        marginBottom:20,
   
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
    deleteBtn: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        // fontSize: 16,
        // fontWeight: 500,
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

