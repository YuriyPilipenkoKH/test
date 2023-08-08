import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from "../../utils/themes";
import { useSelector } from "react-redux";
import { getTheme } from '../../redux/auth/authSelectors';


const Notifier = ({ visible, message,  }) => {

    const [mode, setMode] = useState(lightTheme)
    const theme = useSelector(getTheme)

        // Theme
  const toggleMode = () => {
    setMode(theme === 'light' ? lightTheme : darkTheme);
  };
  useEffect(() => {
    toggleMode()
  }, [theme])

//   const handleConfirm = () => {
//     onConfirm(commentId); // Call the onConfirm function with the commentId
//   };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}

    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: mode.modalBg}]}>
          <Text 
       
          style={[styles.messageText, {color: mode.textColor }]}>{message}</Text>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 8,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },

});

export default Notifier;