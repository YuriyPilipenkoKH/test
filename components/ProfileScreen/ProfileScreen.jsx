import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    ImageBackground,
 
} from "react-native";
import BackgroundImage from "../../assets/img/photo-bg.jpg";
import { StatusBar } from 'expo-status-bar';


import User from "../../assets/img/user.png";
import {MaterialCommunityIcons,  AntDesign, Feather,  FontAwesome } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getData, getPlaces, gpsDefault } from "../../utils/dataStorage";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";
import { useAuth } from "../../redux/auth/authSelectors";

const item = gpsDefault


const ProfileScreen =({ route }) => {
    const {posts: renamedPosts} = route.params;
    
    const [posts, setPosts] = useState( getData())
    const [likes, setLikes] = useState(Array(posts.length).fill(0))
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const {login }= useAuth()

    const handleLike = (index) => {
        setLikes((prevLikes) => {
          const newLikes = [...prevLikes];
          newLikes[index] += 1; // Increment the likes for the specific index
          return newLikes;
        });
      };


    
    return (
        <>
  <View>
                    <ImageBackground style = {[ styles.background]} source={BackgroundImage}>
                      <StatusBar style="auto" /> 
            
                <View contentContainerStyle={styles.contentContainer} 
                style={ {...styles.main, marginBottom: posts ? 0 : 90,}}>
            
                    <ImageBackground style = {regStyles.photoWrapp} source={User}> 
                    <TouchableOpacity 
                    onPress={() => console.log('posts:', posts)}
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
                style={regStyles.title}>{login}</Text>


        {posts && <FlatList style ={{marginBottom:120,}}
                data={posts} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                <View style={postStyles.card}>
        <ImageBackground style={postStyles.photoFrame} source={{uri: item.photo}}></ImageBackground>
        <Text style={postStyles.cardText}>{item.naming}</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome 
             onPress={() => navigation.navigate("Comments")}
            style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <AntDesign
            onPress={(value) =>{
                //  console.log(item.id)
                 handleLike(item.id -1)
                }}
            name="like2" size={24} color="#ff6c00" />
            <Text style={{...postStyles.cardComment,
            color:  likes[item.id -1] ? '#ff6c00' : '#D6D6D6',
            }}>
                {likes[Number(item.id -1)]}</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={postStyles.cardLocation}>{item.location}</Text>
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


    <View style = {[postStyles.footer, styles.footer]}>

        <TouchableOpacity
        onPress={() => navigation.navigate("Posts")}
        style={postStyles.icon}>
             <Feather name="grid" size={24} color="#21212199" />
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={() => navigation.navigate("Profile")}
        style={postStyles.addBtn}>
            <Feather name="user" size={24} color="#eee" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate("CreatePost")}
        style={postStyles.icon}>
             <AntDesign name="plus" size={24} color="#21212199" /> 
        </TouchableOpacity>
        <View
  
         style = {regStyles.homeIndicator} > 
         <Text onPress={() =>{
            //  console.log('posts:', posts)
             console.log('likes:', likes)
             }}>get</Text>
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

        backgroundColor: '#f5f5f5',
       marginTop: 140,
    //    marginBottom: 80,
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
        // marginTop: 40,
      position: 'absolute',
      bottom: 0  
    },
  });