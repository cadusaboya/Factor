import React from 'react';
import { View, StyleSheet, Dimensions, Linking } from 'react-native';
import { Icon } from '@rneui/themed';
import { sendWhatsapp } from '@/services/sendWhatsapp';

const { width, height } = Dimensions.get('window');

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