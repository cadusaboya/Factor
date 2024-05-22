import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function CreateAccount() {
  const { register, setValue, handleSubmit, errors } = useForm();
  const navigation = useNavigation();
  
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  
  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/login/`, data);
      if (res.data.message === "Login successful") {
        // Store the JWT token securely (e.g., in AsyncStorage or Redux state)
        const token = res.data.token;
        console.log('Token:', token);
        // Navigate to the main screen or perform other actions
        navigation.navigate('Home');
        Alert.alert('Login successful');
      } else {
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login');
    }
  };
  
  const onSubmit = (data) => {
    handleLogin(data);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Usuário</Text>
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
          onPress={handleSubmit(onSubmit)}
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