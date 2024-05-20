import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';


export default function HomeScreen() {

    const navigation = useNavigation();

    const handleButtonPress = (menu: string) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu); // Navigate to the desired screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ThemedText style={styles.saldo}>Saldo disponível:</ThemedText>
        <ThemedText style={styles.valor}>R$ 12.000,00</ThemedText>
      </View>


      <View style={styles.center}>
        <View style={styles.row}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Antecipação')}>
            <Text style={styles.buttonText}>Antecipação</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Meus Pedidos')}>
            <Text style={styles.buttonText}>Meus Pedidos</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Mensagens')}>
            <Text style={styles.buttonText}>Mensagens</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Meus Hospitais')}>
            <Text style={styles.buttonText}>Meus hospitais</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Registro')}>
              <Text style={styles.buttonText}>Teste</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const buttonWidth = (width - 32) / 2.5; // Adjust button width according to screen size

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
    color: 'white',
    marginTop: 50,
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
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
    height: 150, // Adjust button height as needed
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginVertical: 100
  },
});

