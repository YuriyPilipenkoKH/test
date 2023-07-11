
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



const temp = () => {
  return (
<View style={styles.card} key={item.id.toString()}>
<Image source={{uri: item.photo}}  style={styles.photoFrame} />
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
</View> 
  )
}

const temp2 = () => {
  return (
    <View key={item.id.toString()}>
    <Image 
    source={{uri: item.photo}}
    style ={{marginBottom:100,}}
    />
  </View>
    )
  }



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

useEffect(() => {
  (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");

      let locationUser =
          await Location.requestForegroundPermissionsAsync();
      if (locationUser.status !== "granted") {
          console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
      };
      setLocation(coords);
  })();
  return reset();
}, []);

const places = [{
  id: '01',
  naming: 'The City of Lights',
  location: 'Paris, France',
  photo: 'https://www.holidify.com/images/bgImages/PARIS.jpg'
},
{
  id: '02',
  naming: 'The Grand Canyon',
  location: 'USA',
  photo: 'https://www.holidify.com/images/cmsuploads/compressed/grand_20181214130027.jpg'
},
{
  id: '03',
  naming: 'The Land Where Adventures Wait',
  location: 'New Zealand',
  photo: 'https://holidify.com/images/bgImages/NEW-ZEALAND.jpg'
},
{
  id: '04',
  naming: ' The heritage of England',
  location: 'London, UK',
  photo: 'https://www.holidify.com/images/bgImages/LONDON.jpg'
},
{
  id: '05',
  naming: ' Great Barrier Reef ',
  location: 'Australia',
  photo: 'https://www.holidify.com/images/bgImages/GREAT-BARRIER-REEF.jpg'
},
]