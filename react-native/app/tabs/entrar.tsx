import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import {ButtonSolid} from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function CreateAccount() {
    const { register, setValue, handleSubmit, errors } = useForm(); // Added handleSubmit here
    const navigation = useNavigation();
  
    const API_URL = 'https://factor-cadusaboya.loca.lt';

    const handleButtonPress = (menu: string) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu); // Navigate to the desired screen
  };
    
    const handleLogin = async (data) => { // Accept data as argument
      try {
        const res = await axios.post(`${API_URL}/login/`, data); // Use data object directly
       // Check if login was successful
      if (res.data.success) {
        // Navigate to the main screen or perform other actions
        navigation.navigate('Home');
        Alert.alert('Login successful');
      } else {
        // Display error message to the user
        Alert.alert('Invalid username or password');
      }
      } catch (error) {
        console.error('Error during login:', error);
        // Display generic error message to the user
        Alert.alert('An error occurred during login');
      }
    };
  
    const onSubmit = (data) => { // Accept data as argument
      handleLogin(data); // Pass data to handleCreateUser function
    };
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label} >Usuário</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setValue('username', text)}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => setValue('password', text)}
            secureTextEntry={true}
        />
      </View>

      <View style={styles.but}>
      <ButtonSolid
              title={'Entrar'}
              useColor={'rgb(0, 0, 0)'}
              onPress={() => handleButtonPress('Home')} // handleSubmit(onSubmit)
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    margin: 20,
    marginLeft: 0,
  },

  box: {
    marginHorizontal: 30,
  },
  but: {
    marginVertical: 100,
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#E7E7E7',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.3,
    height: 40,
    padding: 10,
    borderRadius: 4,
  }
});