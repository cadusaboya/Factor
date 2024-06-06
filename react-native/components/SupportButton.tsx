import React from 'react';
import { View, StyleSheet, Dimensions, Linking } from 'react-native';
import { Icon } from '@rneui/themed';

const { width, height } = Dimensions.get('window');

const sendWhatsapp = () => {
  // Phone number in international format
  const phoneNumber = '+5591984147769';

  // Message you want to send
  const message = 'Olá, estou com um problema referente ao aplicativo Factor. Você pode me ajudar?    ';

  // Construct the WhatsApp URL
  const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  // Open the WhatsApp app
  Linking.openURL(whatsappUrl)
    .then(() => console.log('WhatsApp opened'))
    .catch((error) => console.error('Error opening WhatsApp:', error));
};

const SupportButton = () => {
  return (
      <View style={styles.supPosition}>
        <Icon
            reverse
            name='face-agent'
            type= 'material-community'
            color='black'
            size={20}
            onPress={sendWhatsapp} />
      </View>
  );
};

const styles = StyleSheet.create({
    supPosition: {
      position: 'absolute',
      bottom: height * 0.25, // 1.5% of screen height
      right: width * 0.055 , // Adjust right margin to 2% of screen width
      width: width * 0.06, // 11% of screen width
      height: height * 0.035, // 3.5% of screen height
  },
});

export default SupportButton;