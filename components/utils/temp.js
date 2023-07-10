
{!photo 
    ? <Camera   ref={setsnap}
      style = {[postStyles.photoFrame, styles.camera, ]}>
      </Camera>
    : <Image source={photo}/>}
      <TouchableOpacity
            onPress={takePicture}
             style = {styles.cameraBtn}>
              <MaterialIcons name="photo-camera" size={24} color="#bdbdbd" />
            </TouchableOpacity>

const styles = StyleSheet.create({

    cameraBtn: {
        position: 'absolute',
        right: '50%',
        top: '25%',
        transform: [{ translateX: 30 },{ translateY: 30 }],
        width: 60,
        height: 60,
        backgroundColor: '#fff3',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


{/* <View style={styles.card}>
<ImageBackground style={styles.photoFrame} source={BgImage1}></ImageBackground>
<Text style={styles.cardText}>Ліс</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Ivano-Frankivs'k Region, Ukraine</Text>
    </View>
</View>
</View> */}

{/* <View style={styles.card}>
<ImageBackground style={styles.photoFrame} source={BgImage2}></ImageBackground>
<Text style={styles.cardText}>Захід на Чорному морі</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather 
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Odesa, Ukraine</Text>
    </View>
</View>
</View> */}
{/* 
<View style={styles.card}>
<ImageBackground style={styles.photoFrame} source={BgImage3}></ImageBackground>
<Text style={styles.cardText}>Старий будиночок у Венеції</Text>
<View style={styles.cardDescription}>
    <View style={styles.flexWrapp} >
    <FontAwesome5
    onPress={() => navigation.navigate("Comments")}
    style={styles.iconComment} name="comment" size={24} color="#bdbdbd" />
    <Text style={styles.cardComment}>0</Text>
    </View>

    <View style={styles.flexWrapp}>
    <Feather
    onPress={() => navigation.navigate("Map")}
    name="map-pin" size={24} color="#bdbdbd" />
    <Text style={styles.cardLocation}>Venice, Italy</Text>
    </View>
</View>
</View> */}