
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import BackgroundMap from "../../assets/img/ny_subway_map.jpg";

const MapScreen = () => {
  return (
    <ImageBackground style={styles.container} source={BackgroundMap}>
      <Text>Map</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    resizeMode: 'cover',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;