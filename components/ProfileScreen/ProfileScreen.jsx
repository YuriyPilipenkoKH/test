import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,} from "react-native";
import BackgroundImage from "../../assets/img/photo-bg.jpg";
import { StatusBar } from 'expo-status-bar';
import User from "../../assets/img/avatar/av-252.png";
import {MaterialCommunityIcons,  AntDesign, Feather,  FontAwesome } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getData} from "../../utils/dataStorage";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, logOut, updateAvatar } from "../../redux/auth/authOperations";
import { getTheme, useAuth } from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import Loader from "../Loader/Loader";
import { lightTheme, darkTheme } from "../../utils/themes";
import { handleLike } from "../../utils/handleLike";
import * as ImagePicker from "expo-image-picker";



const ProfileScreen =({ route }) => {
    
    const [posts, setPosts] = useState( getData())
    // const [likes, setLikes] = useState(0)
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(lightTheme)
    const [newAvatar, setNewAvatar] = useState(null)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const {userId, login, avatar  }= useAuth()
    const theme = useSelector(getTheme)


      const getPostsByCurrentUser = async () => {
   
        const dbRef = collection(db, "posts");
        const searchQuery = query(dbRef, where("userId", "==", userId));
        onSnapshot(searchQuery, (docSnap) =>
          setPosts(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );
      };

      const uploadAvatarFromGallery = async () => {
        setLoading(true);
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
          });
    
          if (!result.canceled) {
            setNewAvatar(result.assets[0].uri);
            console.log('Avatar Uploaded ',result)
          }
          setLoading(false);
        } catch (error) {
          console.log("Upload avatar error", error.message);
          setLoading(false);
         
        }
      };
    
      const deleteAvatarFromUser = async () => {
        dispatch(deleteAvatar());
    };
    
    
    const updateAvatarFromUser = async () => {

        uploadAvatarFromGallery()
        dispatch(updateAvatar(newAvatar));
        
      };
    
      useEffect(() => {
         getPostsByCurrentUser();
      }, [posts]);

      // Theme
const toggleMode = () => {
        setMode(theme === 'light' ? lightTheme : darkTheme);
    };
    useEffect(() => {
        toggleMode()
    }, [theme])

    
    return (
        <>
        <View>
        <ImageBackground style = {[ styles.background]} source={BackgroundImage}>
            <StatusBar style="auto" /> 
            
        <View contentContainerStyle={styles.contentContainer} 
        style={ {...styles.main,
        //  marginBottom: posts ? 0 : 90,
            height: posts ? 560 : 600,
            backgroundColor: mode.backgroundColor,
        }}>
            
        <ImageBackground style = {regStyles.photoWrapp} source= { {uri: avatar} && User}> 
        <TouchableOpacity 
        onPress={updateAvatarFromUser}
        style = {regStyles.plusBtn}>
            <AntDesign  name="pluscircleo" size={25} style = {[regStyles.plus]} />
        </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity 
            onPress={() =>{
            console.log("exit")
            dispatch(logOut())}}
            style={styles.trayArrowBtn}>
            <MaterialCommunityIcons style = {styles.trayArrow} name="tray-arrow-up" size={24} color="black" />
            </TouchableOpacity>
        <Text 
            onPress={() => getData()}
        style={[regStyles.title, {color: mode.textColor }]}>{login}</Text>


        {posts &&
         <FlatList style ={{marginBottom:20, backgroundColor: mode.backgroundColor,}}
                data={posts} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (

        <View style={[postStyles.card, {backgroundColor: mode.backgroundColor},]} key={item.id}>
        <ImageBackground style={postStyles.photoFrame} source={{uri: item.photo}}></ImageBackground>
        <Text style={[postStyles.cardText, {color: mode.textColor }]}>{item.postName}</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome 
             onPress={() => navigation.navigate("Comments", {postId: item.id, photo: item.photo})}
            style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text 
            style={[postStyles.cardComment, {
                color: mode.textColor ,
                color:  item.comments !== 0 ? '#ff6c00' : '#D6D6D6',
                }]}>
                {item.comments}</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <TouchableOpacity
               onPress={() => handleLike(item.id)}
           >
           <AntDesign
            name="like2" size={24} color="#ff6c00" />
            </TouchableOpacity>     
            <Text
        //    onPress={() => console.log('item.id:', item.id)}
             style={{...postStyles.cardComment,
            color:  item.likes !== 0 ? '#ff6c00' : '#D6D6D6',
            }}>{item.likes}</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={[postStyles.cardLocation, {color: mode.textColor }]}>{item.placeName}</Text>
            <Feather
            onPress={() => navigation.navigate("Map", {item})}
            name="map-pin" size={24} color="#bdbdbd" />
            </View>
        </View>
        </View> 

            )} />  }
            
        </View>
        </ImageBackground>
        </View>

        {loading &&  <Loader/>}
    <View style = {[postStyles.footer, styles.footer, { backgroundColor: mode.backgroundColor}]}>

        <TouchableOpacity
        onPress={() => navigation.navigate("Posts")}
        style={postStyles.icon}>
             <Feather style={[{color: mode.textColor }]} name="grid" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={() => navigation.navigate("Profile")}
        style={postStyles.addBtn}>
            <Feather name="user" size={24} color="#eee" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate("CreatePost")}
        style={postStyles.icon}>
             <AntDesign style={[{color: mode.textColor }]} name="plus" size={24} /> 
        </TouchableOpacity>
        <View
  
         style = {regStyles.homeIndicator} > 
         <Text onPress={() =>console.log('avatar:', newAvatar)}>
            get</Text>
         </View>
    </View>   
    </>
  
    )
}
export default  ProfileScreen

export const styles = StyleSheet.create({

    background: {

        gap: 160,
        backgroundSize: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    main: {
        width: '100%',

        // backgroundColor: '#f5f5f5',
       marginTop: 140,
        paddingBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      
      },
      trayArrowBtn: {
        position: 'absolute',
        right: 16,
        top:16,
    },
    trayArrow: {
        transform: [{ rotate: '90deg' }],
        color: '#bdbdbd',
    },
    cardDescription: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        gap: 24,
    },
    wrapp1: {
        flex:1,
    },
    wrapp2: {
        flex:2,
    },
    wrapp3: {
        flex:5,
        flexDirection: 'row-reverse'

    },

    flexWrapp: {
        position: 'absolute',
        right:0,
    },

    footer: {
    
      position: 'absolute',
      bottom: 0  
    },
  });