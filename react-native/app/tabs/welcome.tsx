import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';


export default function BemVindo() {

    const navigation = useNavigation();

    const handleButtonPress = (menu: string) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu); // Navigate to the desired screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>

        <ThemedText style={styles.saldo}>Em breve, Factor</ThemedText>
        <ThemedText style={styles.saldo2}>Criada para facilitar a vida dos médicos</ThemedText>
        
        <View style={styles.but}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Registro')}>
            <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Entrar')}>
            <Text style={styles.buttonText}>Já sou usuário</Text>
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const buttonWidth = (width) / 1.5; // Adjust button width according to screen size

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 16 / 7, // Aspect ratio 16:9
  },
  overlay: {
    height: 150,
    marginBottom: 50,
    backgroundColor: '#1c1b1b',
  },

  saldo: {
    color: 'black',
    marginTop: 100,
    marginBottom: 100,
    fontSize: 24,
    fontWeight: 'bold',
  },
  saldo2: {
    color: 'black',
    marginBottom: 230,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
  },
  valor: {
    marginHorizontal: 50,
    marginTop: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  button: {
    width: buttonWidth,
    height: 60, // Adjust button height as needed
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center', // Center content horizontally
    marginVertical: 100
  },

  but: {
    marginVertical: 20,
    borderRadius: 1,
  },
});

