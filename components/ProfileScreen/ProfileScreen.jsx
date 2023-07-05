import {
    Text,
    StyleSheet,
    View,
    // TextInput,
    TouchableOpacity,
    // Platform,
    // KeyboardAvoidingView,
    // TouchableWithoutFeedback,
    // Keyboard,
    ImageBackground,
 
} from "react-native";
import BackgroundImage from "../../assets/img/photo-bg.jpg";


import User from "../../assets/img/user.png";
import {  AntDesign, Feather,  FontAwesome } from '@expo/vector-icons'; 
import { styles as regStyles } from "../RegistrationScreen/RegistrationScreen";
import { styles as postStyles } from "../PostsScreen/PostsScreen";
import BgImage1 from "../../assets/img/forest.jpg";
import BgImage2 from "../../assets/img/sea.jpg";
import BgImage3 from "../../assets/img/house.jpg";

const ProfileScreen =() => {


    return (
        <ImageBackground style = {[regStyles.background, styles.background]} source={BackgroundImage}>
          

    <View style = {[regStyles.main, styles.main]}>

        <ImageBackground style = {regStyles.photoWrapp} source={User}> 
        <TouchableOpacity style = {regStyles.plusBtn}>
            <AntDesign  name="pluscircleo" size={25} style = {[regStyles.plus]} />
        </TouchableOpacity>
         </ImageBackground>
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
    )
}
export default  ProfileScreen

export const styles = StyleSheet.create({

    background: {
        gap: 160,
        backgroundSize: 'auto',
    },
    main: {
        minHeight: 500,
        height: 'auto',
        justifyContent: 'space-between',
        paddingBottom: 8,
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
        // flex:1,
    //   position: 'absolute',
    //   bottom: 0  
    },
  });