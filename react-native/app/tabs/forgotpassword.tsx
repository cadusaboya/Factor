import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const { register, setValue, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_URL = 'https://api.factorpa.xyz';

  const handleForgot = async (data) => {  
    
    try {
      const res = await axios.post(`${API_URL}/accounts/password_reset/`, data);
      console.log(res.data);
      Alert.alert('E-mail enviado', 'Verifique sua caixa de spam ou de entrada para redefinir sua senha');
      setIsButtonDisabled(false);
      navigation.goBack();
    } catch (error) {
      if (error.response.status === 404) {
        Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
      } 
      else if (error.response.status === 400) {
        Alert.alert('Erro', 'Combinação de usuário e e-mail não encontrada');
      }
      else {
        console.error('Error sending password reset request:', error);
        Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (data) => {
    setIsButtonDisabled(true);

    // Check if username is empty
    const fieldsToCheck = ['username', 'email'];
    clearErrors();
    let hasErrors = false;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'E-mail inválido',
      });
      hasErrors = true;
    }
    
    // Loop through fields to check for emptiness and set errors
    fieldsToCheck.forEach(field => {
      if (!data[field]) {
        setError(field, {
          type: 'manual',
          message: 'Este campo é obrigatório',
        });
        hasErrors = true;
      }
    });

    // If all validations pass, proceed with user login
    if (!hasErrors){
      handleForgot(data);
    }
    else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
      return ;
    }
    
  };

  const usernameRef = useRef();
  const emailRef = useRef();

  React.useEffect(() => {
    register('username');
    register('email');
  }, [register]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          label="Usuário"
          style={[styles.input, errors.username && styles.inputError]}
          onChangeText={(text) => setValue('username', text)}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      </View>

      <View style={styles.box}>
        <TextInput
            label="E-mail"
            style={[styles.input, errors.email && styles.inputError]}
            onChangeText={(text) => setValue('email', text)}
            keyboardType="email-address"
            returnKeyType="done"
            ref={emailRef}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <ButtonSolid
          title={'Recuperar Senha'}
          useColor={'rgb(0, 0, 0)'}
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
          style={styles.button}
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

  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },

  errorText: {
    color: 'red',
    marginTop: 4,
  },
});