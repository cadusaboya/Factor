import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import {ButtonSolid} from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import HPDImage from '@/assets/images/PD.png';
import CSTImage from '@/assets/images/HCST.png';
import STImage from '@/assets/images/HST.png';

export default function Tab4Screen() {
  const navigation = useNavigation();

  const [checkboxStates, setCheckboxStates] = useState([
    true, // checkbox1
    true, // checkbox2
    true, // checkbox3
  ]);

  const handleCheckboxChange = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle the state of the checkbox at the specified index
      return newStates;
    });
  };

  const handleButtonPress = () => {
    // Show an alert
    Alert.alert(
      'Em análise',
      'Em breve seu saldo será atualizado',
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
        <View>
            <Text style={styles.head}>Hospitais credenciados </Text>
        </View>

        <View style={styles.box}>
        <WhiteBox width={350} height={500}>
          {[{ key: 1, image: HPDImage }, { key: 2, image: CSTImage }, { key: 3, image: STImage }].map(({ key, image }, index, array) => (
            <React.Fragment key={key}>
              <View style={styles.option}>
                <Checkbox
                  style={styles.checkbox}
                  value={checkboxStates[key]}
                  onValueChange={() => handleCheckboxChange(key)}
                  color={checkboxStates[key] ? 'green' : undefined}
                />
                <Image source={image} style={styles.image} resizeMode="contain" />
              </View>
              
              <View style={styles.divider} />
            </React.Fragment>
          ))}
        </WhiteBox>
        </View>

        <View style={styles.but}>
        <ButtonSolid
              title={'Atualizar'}
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

  image: {
    width: 200, // Adjust width and height as needed
    height: 60,
  },

  option: {
    flexDirection: 'row', // Align items horizontally
    height: 80,
    width: 290,
  },

  box: {
    marginVertical: 20,
  },

  but: {
    marginTop: 60,
    borderRadius: 1,
  },

  text: {
    fontSize: 32,
  },

  head: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
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
    marginVertical: 20,
    marginRight: 20,
  },

  divider: {
    height: 0.3,
    backgroundColor: 'black',
    marginBottom: 20,
  },
});