import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import {ButtonSolid} from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';

export default function Tab1Screen() {
  const navigation = useNavigation();

  const [checkboxStates, setCheckboxStates] = useState([
    false, // checkbox1
    false, // checkbox2
    false, // checkbox3
    false, // checkbox4
    false, // checkbox5
  ]);

  const handleCheckboxChange = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle the state of the checkbox at the specified index
      return newStates;
    });
  };

  const calculateResult = () => {
    // Count the number of checked checkboxes (true values)
    const checkedCount = checkboxStates.reduce((count, isChecked) => {
      return isChecked ? count + 1 : count;
    }, 0);

    // Multiply the checked count by a value (e.g., 1000)
    const result = checkedCount * 2400;
    return result;
  };

  const handleButtonPress = () => {
    // Show an alert
    Alert.alert(
      'Sucesso',
      'Em breve o dinheiro será enviado para sua conta',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to the main page
            navigation.goBack(); // or navigation.navigate('Home') if 'Home' is the name of the main page
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box}>
          <WhiteBox width={350} height={100}>
            <Text style={styles.textBox}>Saldo sendo antecipado: </Text>
            <Divider />
            <Text style={styles.text}>R$ {calculateResult()}</Text>
          </WhiteBox>
        </View>

        <View style={styles.box}>
          <WhiteBox width={350} height={360}>
            <Text style={styles.textBox}>5 plantões disponíveis </Text>
            <Divider />
            {[1, 2, 3, 4, 5].map((num, index) => (
              <View key={num} style={styles.option}>
                <Checkbox
                  style={styles.checkbox}
                  value={checkboxStates[index]}
                  onValueChange={() => handleCheckboxChange(index)}
                  color={checkboxStates[index] ? 'green' : undefined}
                />
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textMargin}>
                  Plantão {num}/05/2024 em Hospital {num === 3 ? 'Santa Terezinha' : 'Porto Dias'}
                </Text>
              </View>
            ))}
          </WhiteBox>
        </View>

        <View style={styles.box}>
          <WhiteBox width={350} height={100}>
          <Text style={styles.textBox}>Valor a ser creditado na conta: </Text>
            <Divider />
            <Text style={styles.text}>R$ {calculateResult() * 0.94}</Text>
          </WhiteBox>
        </View>

        <View style={styles.but}>
        <ButtonSolid
              title={'Confirmar antecipação'}
              useColor={'rgb(0, 0, 0)'}
              onPress={handleButtonPress}
        />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
  },

  option: {
    flexDirection: 'row', // Align items horizontally
    height: 58,
    width: 290,
  },

  box: {
    marginVertical: 20,
  },

  but: {
    marginVertical: 20,
    borderRadius: 1,
  },

  text: {
    fontSize: 32,
  },

  textBox: {
    fontSize: 18,
    marginBottom: 10,
  },

  textMargin: {
    fontSize: 15,
    marginVertical: 10,
    marginLeft: 8,
  },

  checkbox: {
    marginVertical: 15,
    marginRight: 5,
  },
});