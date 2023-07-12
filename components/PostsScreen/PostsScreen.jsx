
import {
    Text,
    StyleSheet,
    Image,
    View,
    FlatList,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    // ImageBackground,
    // ScrollView,
    
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import User from "../../assets/img/user.png";
import { MaterialCommunityIcons, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
// import BgImage1 from "../../assets/img/forest.jpg";
// import BgImage2 from "../../assets/img/sea.jpg";
// import BgImage3 from "../../assets/img/house.jpg";
import { useNavigation } from "@react-navigation/native";
import { getData} from "../../utils/dataStorage";
import { useEffect, useState } from "react";


const PostsScreen =({route}) => {
  const [posts, setPosts] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    if(route.params){
      setPosts(prev => [...prev, route.params.data])
    }
    
  }, [route.params])
  

    return (
        <View style = {[regStyles.background, styles.background]}>
        <StatusBar style="auto" /> 

        <View style= {[styles.postsScreen ]}>
        <View style={styles.titleWrapp}>
            <Text style={styles.title}
            onPress={() => getData()}>
              Публікації
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Login")}
            style={styles.trayArrowBtn}>
            <MaterialCommunityIcons style = {styles.trayArrow} name="tray-arrow-up" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View contentContainerStyle={styles.contentContainer} style={[styles.main]}>

        <View style={styles.user}>
            <View style={styles.imgContainer}>
                 <Image style={styles.userAvatar} source={User} />
            </View>
            <View style={styles.userWrapp}>
            <Text 
            onPress={() => console.log("posts:",posts)}
            style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>

            </View>
        </View>

        {posts && <FlatList style ={{marginBottom:260,}}
                data={posts} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
        <View style={styles.card} key={item.id.toString()}>
        <Image source={{uri: item.photo}}  style={styles.photoFrame} />
        <Text style={styles.cardText}>{item.naming}</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5
            onPress={() => navigation.navigate("Comments")}
            style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={styles.cardComment}>0</Text>
            </View>

            <View style={styles.flexWrapp}>
            <Feather
            onPress={() => navigation.navigate("Map",{item})}
            name="map-pin" size={24} color="#bdbdbd" />
            <Text style={styles.cardLocation}>{item.location}</Text>
            </View>
        </View>
        </View> 

        )} /> }

    

        </View>

        <View style = {styles.footer}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Posts")}
        style={styles.icon}>
             <Feather name="grid" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate("CreatePost")}
        style={styles.addBtn}>
            <AntDesign name="plus" size={14} color="#eee" /> 
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Profile", {posts})}
        style={styles.icon}>
             <Feather name="user" size={24} color="#212121" /> 
        </TouchableOpacity>

        <View style = {regStyles.homeIndicator} ></View>
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
    trayArrowBtn: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: 160 }],
       
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

