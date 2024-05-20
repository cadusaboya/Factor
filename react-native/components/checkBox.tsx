// CustomCheckBox.tsx

import React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';

const CustomCheckbox = ({ id, initialValue = false, onChange }) => {
  
  const [isChecked, setChecked] = useState(initialValue);

  const handleCheckboxChange = (newValue) => {
    setChecked(newValue);
    if (onChange) {
      onChange(id, newValue);
    }
    console.log('Checkbox value changed:', newValue);
  };

  return (
    <Checkbox
      style={styles.checkbox}
      value={isChecked}
      onValueChange={setChecked}
      color={isChecked ? 'green' : undefined}
  />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginVertical: 15,
    marginRight: 5,
  },
});

export default CustomCheckbox;
