import { View, Text,  Dimensions, StyleSheet } from "react-native";
import MapView, {Marker} from 'react-native-maps'

const MapScreen = ({gps}) => {

  // const {longitude, latitude} = gps
  return (
    // <ImageBackground style={styles.container} source={BackgroundMap}>
     <View style={styles.map}>
      <MapView  style={{ flex: 1,}}
      initialRegion={{
        longitude: 30.602185,
        latitude: 50.515339,
        // longitude,
        // latitude,
        longitudeDelta:  0.1,
        latitudeDelta: 0.1 ,
      }}
      >
        <Marker 
        onPress={()=> console.log(gps)}
         coordinate={{ longitude: 30.602185, latitude: 50.515339,}}
        title="travel photo"
        />
        {/* <Text>Map</Text> */}
      </MapView>
     </View>
  
  );
};



const styles = StyleSheet.create({
  map: {

    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;