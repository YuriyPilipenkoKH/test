
import {
    Text,
    StyleSheet,
    Image,
    View,
    FlatList,
    TouchableOpacity,} from "react-native";
import { StatusBar } from 'expo-status-bar';
import User from "../../assets/img/avatar/av-252.png";
import { MaterialCommunityIcons, AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getTheme, useAuth } from "../../redux/auth/authSelectors";
import {  logOut } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { collection,  onSnapshot, query} from "firebase/firestore";
import Loader from "../Loader/Loader";
import { toggleTheme } from "../../redux/themeSlice";
import { lightTheme, darkTheme } from "../../utils/themes";
import { countLikes } from "../../utils/handleLike";
import { getLang } from "../../redux/selectors";
import { useTranslation } from "react-i18next";
import { toggleLang } from "../../redux/langSlice";



  const PostsScreen =({route}) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(lightTheme)
  const navigation = useNavigation();
  const { login , email, avatar, userId, auth}= useAuth() 

  const theme = useSelector(getTheme)
  const dispatch = useDispatch()
  const lang = useSelector(getLang)
  const { t } = useTranslation();
  const { i18n } = useTranslation();



 const getAllPosts = async () => {

    setLoading(true);
    try {
      const dbRef = collection(db, "posts");
      const searchQuery = query(dbRef);
      onSnapshot(searchQuery, (docSnap) => {
        const updatedPosts = docSnap.docs.map((doc) => {
          const postData = doc.data();
          const likes = postData.likes || [];
          const isActive = likes.includes(userId); // Check if user's userId is in likes array
          return { id: doc.id, ...postData, active: isActive };
        });
        setPosts(updatedPosts);
      });

      setLoading(false);
    } catch (error) {
      console.log('Error fetching posts:', error);
      setLoading(false);
    }

  }  

  useEffect(() => {
    getAllPosts();
  }, [route.params]);

    // Language
const handleLanguageChange = () => {
  i18n.changeLanguage(lang === 'english' ? 'en' : 'ua');
};

useEffect(() => {
  handleLanguageChange()
}, [lang])


// Theme
const toggleMode = () => {
  setMode(theme === 'light' ? lightTheme : darkTheme);
};
useEffect(() => {
  toggleMode()
}, [theme])
 // style= {theme === 'light' ? 'dark-content' : 'light-content'}

    return (
        <View style = {[regStyles.background, styles.background, { backgroundColor: mode.backgroundColor}]}>
        <StatusBar  barStyle={theme === 'light' ? 'dark-content' : 'light-content'}  /> 
        

        <View style= {[styles.postsScreen ]}>
        <View style={styles.titleWrapp}>
            <Text style={[styles.title, {color: mode.textColor }]}
              onPress={() => console.log(posts)}>
              {t('posts')}
              </Text>

            <TouchableOpacity 
            onPress={() => {
        
              dispatch(toggleTheme())}}
              style={[styles.themeBtn]}>
            <MaterialCommunityIcons 
              style = {[styles.themeIcon, {color: mode.textColor }]}
              name= {theme === 'light'? "lightbulb-on-outline" : "moon-waning-crescent"} 
               size={24} />
            </TouchableOpacity> 
            <TouchableOpacity 
              onPress={() =>{dispatch(logOut())}}
              style={styles.trayArrowBtn}>
            <MaterialCommunityIcons 
              style = {styles.trayArrow}
              name="tray-arrow-up" size={24} />
            </TouchableOpacity>
        </View>

        <View style={[styles.main, 
        { backgroundColor: mode.backgroundColor ,}
        ]}
         contentContainerStyle={styles.contentContainer} >

        <View style={styles.user}>
            <View style={styles.imgContainer}>
              <Image style={styles.userAvatar} source={{uri: auth .userAvatar} || User } />
            </View>
            <View style={styles.userWrapp}>
            <Text style={[styles.userName , {color: mode.textColor }]}>{login}</Text>
            <Text style={[styles.userEmail , {color: mode.textColor }]}>{email}</Text>

            </View>
        </View>

        <View style={styles.langWrapp}>
           <TouchableOpacity
              onPress={() => {
                  dispatch(toggleLang())}}
                style={[styles.langBtn]}>
              <MaterialIcons
                style = {[styles.langIcon, {color: mode.textColor }]}
                name="language"
                 size={30} />
            </TouchableOpacity>
            <Text style={[styles.text, {color: mode.textColor }]}>
              {lang === 'english' ? 'EN' : 'UA'}
              </Text>
         </View>

        {posts &&
        <FlatList style ={{marginBottom:260,}}
          data={posts} keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (

        <View style={styles.card}  key={item.id}>
        <Image source={{uri: item.photo}}  style={styles.photoFrame} />
        <Text style={[styles.cardText, {color: mode.textColor }]}>{item.postName}</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5
              onPress={() => navigation.navigate("Comments", {
              postId: item.id,
              photo: item.photo, })}
              style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={[styles.cardComment, {color: mode.textColor }]}>{item.comments}</Text>

            <View style={[styles.flexWrapp, styles.wrapp1]} >
           <TouchableOpacity
               onPress={() => countLikes(userId, item.id,)}
           >
           <AntDesign
            name="like2" size={24} 
            style= {{color: item.active ? "#ff6c00" : '#bdbdbd' }}
            />
            </TouchableOpacity>     
            <Text
        //    onPress={() => console.log('item.id:', item.id)}
             style={{...styles.cardComment,
            color:  item.likes.length !== 0 ? '#ff6c00' :  mode.textColor
            }}>{item.likes.length || 0}</Text>
            </View>   

            </View>

        <View style={styles.flexWrapp}>
        <Feather
          onPress={() => navigation.navigate("Map",{item})}
          name="map-pin" size={24} color="#bdbdbd" />
        <Text style={[styles.cardLocation, {color: mode.textColor }]}>{item.placeName}</Text>
        </View>
        </View>
        </View> 

        )} /> }
        </View>

        {loading && <Loader/>}   

        <View style = {[styles.footer, { backgroundColor: mode.backgroundColor}]}>
        <TouchableOpacity 
          onPress={() => console.log('auth', auth)}
          style={[styles.icon]}>
            <Feather style={[{color: mode.textColor }]} name="grid" size={24}  />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate("CreatePost")}
          style={styles.addBtn}>
            <AntDesign name="plus" size={14} color="#fefee0" /> 
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Profile", {posts})}
          style={styles.icon}>
            <Feather style={[{color: mode.textColor }]} name="user" size={24}  /> 
        </TouchableOpacity>

        <View 
        
        style = {regStyles.homeIndicator} ></View>
        </View>
          
        </View>
        </View>
        
    )
}
export default PostsScreen

export const styles = StyleSheet.create({
    background: {
        paddingTop: 32,
        // justifyContent: 'flex-end', 
        
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    postsScreen: {
        flex: 1,
        gap: 32,
    
    },
    main: {  
        // alignSelf: 'stretch', // Stretch the main content to fill the width
        // height: '100%',
       
        flexDirection: 'column',
        gap: 22,
        
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        

    },
    titleWrapp: {
        position: 'relative',
        height: 44,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 22,
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
    switch: {
      position: 'absolute',
      right: 50,
      bottom: 5,
  
    },
    themeBtn: {
        position: 'absolute',
        left: 25,
        // transform: [{ translateX: 160 }],
       
    },
    themeIcon: {
        // transform: [{ rotate: '90deg' }],
        color: '#212121',

    },
    trayArrowBtn: {
        position: 'absolute',
        right: 25,
        // transform: [{ translateX: 160 }],
       
    },
    trayArrow: {
        transform: [{ rotate: '90deg' }],
        color: '#bdbdbd',

    },
    user: { 
        height: 60,
        width: 343,
        flexDirection: 'row',
        // alignSelf: 'stretch', // Stretch the main content to fill the width
        gap: 12,
    },
    userWrapp: {
        height: 60,
        justifyContent: 'center',
    },

    langWrapp: {
      position: 'absolute',
      right: 25,
      top: 0,
      flex: 1,
      gap: 3,
      alignItems: 'center',
  
    },

    userName: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: 600,
        
    },
    userEmail: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 13,
    },
    card: {
        flex: 1 ,
        // height: 320,
        marginBottom:22,
        flexDirection: 'column',
        gap: 8,  

      },
    photoFrame: {
      width: 343,
      height: 240,
      backgroundColor: '#f6f6f6',
      borderRadius: 8,
      
      alignItems: 'center',
      justifyContent: 'center',
       
      },
    cardText: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
       
      },
    cardDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       
      },
    flexWrapp: {
     
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,

      } , 
    iconComment : {
        transform: [{ scaleX: -1 }],

      } , 
    cardComment: {
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,

      } , 
    cardLocation: {
        color: '#212121',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        textDecorationLine: 'underline',

      } , 
      userAvatar: {
        width: 60,
        height: 60,

      },

      footer: {
        position: 'absolute',
        bottom: 0,
        height: 83,
        paddingTop: 8,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#777',
        borderTopStyle: 'solid',
        width: '100%',
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        gap: 32,
        justifyContent: 'center',
        alignItems:'center',
      
      },
      icon: {
        width:40,
        height: 40,
        justifyContent: 'center',
        alignItems:'center',

      },
      addBtn: {
        width:70,
        height: 40,
       
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#FF6C00',
        borderRadius: 20,
      },

})

