import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WhiteBox = ({ children, width, height }) => {
  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Set background color to transparent
    borderWidth: 0, // No border
    borderRadius: 10, // Adjust border radius as needed
    overflow: 'hidden', // Clip content within the box
    
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1, // Stretch to fill the container's height
  },
});

export default WhiteBox;