
import {
    Text,
    StyleSheet,
    Image,
    View,
    
    // TextInput,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    ImageBackground,
    ScrollView,
    
} from "react-native";

import User from "../../assets/img/user.png";
// import CustomStatusBar from "../CustomStatusBar/CustomStatusBar";
import { MaterialCommunityIcons, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
import BgImage3 from "../../assets/img/house.jpg";


const PostsScreen =() => {

    return (
        <View style = {[regStyles.background, styles.background]}>
        {/* <CustomStatusBar/> */}

        <View contentContainerStyle = {[styles.postsScreen,  styles.contentContainer]}>
        <View style={styles.titleWrapp}>
            <Text style={styles.title}>
              Публікації
            </Text>
            <TouchableOpacity style={styles.trayArrowBtn}>
            <MaterialCommunityIcons style = {styles.trayArrow} name="tray-arrow-up" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.main]}>

        <View style={styles.user}>
            <View style={styles.imgContainer}>
                 <Image style={styles.userAvatar} source={User} />
            </View>
            <View style={styles.userWrapp}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>

            </View>
        </View>

        <View style={styles.card}>
        <ImageBackground style={styles.photoFrame} source={BgImage1}></ImageBackground>
        <Text style={styles.cardText}>Ліс</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5 style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={styles.cardComment}>0</Text>
            </View>

            <View style={styles.flexWrapp}>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            <Text style={styles.cardLocation}>Ivano-Frankivs'k Region, Ukraine</Text>
            </View>
        </View>
        </View>

        <View style={styles.card}>
        <ImageBackground style={styles.photoFrame} source={BgImage2}></ImageBackground>
        <Text style={styles.cardText}>Захід на Чорному морі</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5 style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={styles.cardComment}>0</Text>
            </View>

            <View style={styles.flexWrapp}>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            <Text style={styles.cardLocation}>Odesa, Ukraine</Text>
            </View>
        </View>
        </View>

        <View style={styles.card}>
        <ImageBackground style={styles.photoFrame} source={BgImage3}></ImageBackground>
        <Text style={styles.cardText}>Старий будиночок у Венеції</Text>
        <View style={styles.cardDescription}>
            <View style={styles.flexWrapp} >
            <FontAwesome5 style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
            <Text style={styles.cardComment}>0</Text>
            </View>

            <View style={styles.flexWrapp}>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            <Text style={styles.cardLocation}>Venice, Italy</Text>
            </View>
        </View>
        </View>

        </ScrollView>

        <View style = {styles.footer}>
        <TouchableOpacity style={styles.icon}>
             <Feather name="grid" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
            <AntDesign name="plus" size={14} color="#eee" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
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
        flex: 1,
        paddingTop: 32,
        // justifyContent: 'center', 
        
    },
    contentContainer: {
      alignItems: 'center',

    },

    postsScreen: {
        flex: 1,
        gap: 32,
    
    },
    main: {  
        alignSelf: 'stretch', // Stretch the main content to fill the width
        // height: '100%',
       
        flexDirection: 'column',
        gap: 32,
        paddingLeft: 16,
        paddingRight: 16,
        
    },
    contentContainer: {
        alignItems: 'center', // Apply alignItems to contentContainerStyle
      },

    titleWrapp: {
        position: 'relative',
        height: 44,
        width: '100%',
       
        // alignSelf: 'center',
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
        // position: 'absolute',
        // bottom: 0,
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

