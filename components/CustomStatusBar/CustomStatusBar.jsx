import React, { useEffect, useState } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import moment from 'moment';


const CustomStatusBar = () => {

const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(moment().format('HH:mm'));
  }, 60000);

  return () => {
    clearInterval(timer);
  };
}, []);


  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>

        <Text style={styles.time}>{currentTime}</Text>
      </View>
      <View style={styles.centerContainer}>
        <Feather name="headphones" size={20} color="#000" />
        <View style={styles.divider} />
      </View>
      <View style={styles.rightContainer}>

      <View style={styles.signalContainer}>
        <MaterialCommunityIcons name="signal-cellular-3" size={17} color="#000" />
        </View>

      <MaterialCommunityIcons name="wifi" size={17} color="#000" />
   
        <Ionicons name="battery-full-sharp" size={24} color="#000" />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 44,
    width: 380,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    width:60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    
  },
  centerContainer: {
    flexDirection: 'row',
  
    justifyContent: 'center',
    backgroundColor:'#000',
    width: 219,
    height: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  rightContainer: {
    width:60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: '#000',
    
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  signalBar: {
    height: 4,
    backgroundColor: '#000',
  
  },
  time: {
    fontFamily: 'Roboto',
    color: '#000',
    fontSize: 16,
    fontWeight: 600,
  },
});

export default CustomStatusBar;