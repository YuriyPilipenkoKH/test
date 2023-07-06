import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    // TextInput,
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
import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
import BgImage3 from "../../assets/img/house.jpg";

const ProfileScreen =() => {


    return (
        <ScrollView>
        <ImageBackground style = {[ styles.background]} source={BackgroundImage}>
          <StatusBar style="auto" /> 

    <View contentContainerStyle={styles.contentContainer} style={[ styles.main]}>

        <ImageBackground style = {regStyles.photoWrapp} source={User}> 
        <TouchableOpacity style = {regStyles.plusBtn}>
            <AntDesign  name="pluscircleo" size={25} style = {[regStyles.plus]} />
        </TouchableOpacity>
         </ImageBackground>
         <TouchableOpacity style={styles.trayArrowBtn}>
            <MaterialCommunityIcons style = {styles.trayArrow} name="tray-arrow-up" size={24} color="black" />
            </TouchableOpacity>
    <Text style={regStyles.title}>Natali Romanova</Text>

         <View style={postStyles.card}>
        <ImageBackground style={postStyles.photoFrame} source={BgImage1}></ImageBackground>
        <Text style={postStyles.cardText}>Ліс</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <AntDesign name="like2" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={postStyles.cardLocation}>Ukraine</Text>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            </View>
        </View>
        </View> 

        <View style={postStyles.card}>
        <ImageBackground style={postStyles.photoFrame} source={BgImage2}></ImageBackground>
        <Text style={postStyles.cardText}>Захід на Чорному морі</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <AntDesign name="like2" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={postStyles.cardLocation}> Ukraine</Text>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            </View>
        </View>
        </View>

        <View style={postStyles.card}>
        <ImageBackground style={postStyles.photoFrame} source={BgImage3}></ImageBackground>
        <Text style={postStyles.cardText}>Старий будиночок у Венеції</Text>
        <View style={[postStyles.cardDescription, styles.cardDescription]}>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
            <FontAwesome style={postStyles.iconComment} name="comment" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>
            <View style={[postStyles.flexWrapp, styles.wrapp1]} >
           <AntDesign name="like2" size={24} color="#ff6c00" />
            <Text style={postStyles.cardComment}>0</Text>
            </View>

            <View style={[postStyles.flexWrapp, styles.wrapp3]}>
            <Text style={postStyles.cardLocation}>Italy</Text>
            <Feather name="map-pin" size={24} color="#bdbdbd" />
            </View>
        </View>
        </View>


    <View style = {[postStyles.footer, styles.footer]}>
        <TouchableOpacity style={postStyles.icon}>
             <Feather name="grid" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity style={postStyles.addBtn}>
            <AntDesign name="plus" size={14} color="#eee" />
        </TouchableOpacity>
        <TouchableOpacity style={postStyles.icon}>
             <Feather name="user" size={24} color="#212121" /> 
        </TouchableOpacity>


        </View>   
     <View style = {regStyles.homeIndicator} ></View>
    </View>
        
    </ImageBackground>
    </ScrollView>
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
        marginTop: 40,
    //   position: 'absolute',
    //   bottom: 0  
    },
  });