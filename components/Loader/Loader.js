import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 

const Loader = () => {

    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      startAnimation();
    }, []);
  
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    };
  
    const interpolatedRotation = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  return (
    <View style={styles.container}>
    <Animated.View style={[styles.spinner, { transform: [{ rotate: interpolatedRotation }] }]}>
        <Fontisto name="react" size={100} color="#2196f3" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -60 }],
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:  '#8880',
  },
  spinner: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;