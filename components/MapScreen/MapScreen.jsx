import { View, Text,  Dimensions, StyleSheet } from "react-native";
import MapView, {Marker} from 'react-native-maps'

const MapScreen = ({ route }) => {
  let x 
  let y 
  const { item } = route.params;

  if(item.gps){
     x = item.gps.latitude
     y = item.gps.longitude
  }
  else {
    x = 50.515339
    y = 30.602185

  }

 
  return (
   
     <View style={styles.map}>
      <MapView  style={{ flex: 1,}}
      initialRegion={{
        // longitude: 30.602185,
        // latitude: 50.515339,
        longitude: y,
        latitude: x,
        longitudeDelta:  0.1,
        latitudeDelta: 0.1 ,
      }}
      >
        <Marker 
      // onPress={() => console.log('x:',x, 'y:',y)}
      onPress={() => console.log(item)}
        coordinate={{ longitude: y, latitude: x,}}
        title="travel photo"
        />
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