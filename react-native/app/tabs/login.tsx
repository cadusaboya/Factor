import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const { setValue, handleSubmit } = useForm();
  const navigation = useNavigation();
  const { login } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_URL = 'https://api.factorpa.xyz';

  const handleLogin = async (data) => {
    setIsButtonDisabled(true);

    try {
      const res = await axios.post(`${API_URL}/accounts/login/`, data);
      if (res.data.message === 'Login successful') {
        const token = res.data.token;
        await login(token);
        setIsButtonDisabled(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        Alert.alert('Erro', 'Dados incorretos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Erro', 'Houve um erro durante sua solicitação, tente novamente mais tarde');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (data) => {
    handleLogin(data);
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password route
    navigation.navigate('Esqueci minha senha');
  };

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          label="Usuário"
          style={styles.input}
          onChangeText={(text) => setValue('username', text)}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label="Senha"
          style={styles.input}
          onChangeText={(text) => setValue('password', text)}
          secureTextEntry={true}
          returnKeyType="done"
          ref={passwordRef}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonSolid
          title={'Entrar'}
          useColor={'rgb(0, 0, 0)'}
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: width * 0.1, // 10% of screen width
    marginVertical: height * 0.01, // 1% of screen height
  },
  buttonContainer: {
    marginVertical: height * 0.1, // 10% of screen height
    marginHorizontal: width * 0.2, // 20% of screen width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#E7E7E7',
  },
  forgotPassword: {
    marginTop: 8,
    alignSelf: 'flex-end',
    color: 'blue', // You can change the color as needed
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.08, // 8% of screen height
    borderRadius: 4,
  },
  button: {
    borderRadius: 10,

      // Add these lines to add shading
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
  },
  
  buttonText: {
    fontWeight: 'bold',
  },
});