import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from "../../utils/themes";
import { useSelector } from "react-redux";
import { getTheme } from '../../redux/auth/authSelectors';
import { getLang } from '../../redux/selectors';
import { useTranslation } from 'react-i18next';


const ConfirmPopup = ({ visible, message, onCancel, onConfirm  }) => {

    const [mode, setMode] = useState(lightTheme)
    const theme = useSelector(getTheme)
    const lang = useSelector(getLang)
    const { t } = useTranslation();
    const { i18n } = useTranslation();


        // Theme
  const toggleMode = () => {
    setMode(theme === 'light' ? lightTheme : darkTheme);
  };
  useEffect(() => {
    toggleMode()
  }, [theme])

      // Language
const handleLanguageChange = () => {
  i18n.changeLanguage(lang === 'english' ? 'en' : 'ua');
};

useEffect(() => {
  handleLanguageChange()
}, [lang])

//   const handleConfirm = () => {
//     onConfirm(commentId); // Call the onConfirm function with the commentId
//   };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: mode.modalBg}]}>
          <Text 
       
          style={[styles.messageText, {color: mode.textColor }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.cancelButton,]} onPress={onCancel}>
              <Text style={[styles.buttonText, {color: mode.confirm }]}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, ]} onPress={onConfirm}>
              <Text style={[styles.buttonText, {color: mode.confirm }]}>{t('delete')}</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#05601d',
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#ff8a00',
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
  },
});

export default ConfirmPopup;