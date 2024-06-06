import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const { setValue, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_URL = 'https://api.factorpa.xyz';

  const handleCreateUser = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/accounts/register/`, data);
      console.log(res.data);
      navigation.goBack();
    } catch (error) {
      if (error.response.status === 404) {
        Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
      } else {
        const errors = error.response.data.errors;
        console.error('Error creating user:', errors);
        if (errors.username) {
          Alert.alert('Erro', 'Usuário já existe');
        } else if (errors.cpf) {
          Alert.alert('Erro', 'CPF já cadastrado');
        } else if (errors.email) {
          Alert.alert('Erro', 'E-mail já cadastrado');
        } else {
          Alert.alert('Erro', 'Certifique-se que todos os campos foram preenchidos corretamente.');
        }
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (data) => {
    setIsButtonDisabled(true);
    const fieldsToCheck = ['username', 'password', 'repeat_password', 'fullname', 'cpf', 'telefone', 'email'];

    clearErrors();
    let hasErrors = false;

    if (data.password !== data.repeat_password) {
      setError('repeat_password', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });
      hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'E-mail inválido',
      });
      hasErrors = true;
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(data.cpf)) {
      setError('cpf', {
        type: 'manual',
        message: 'CPF inválido',
      });
      hasErrors = true;
    }

    fieldsToCheck.forEach(field => {
      if (!data[field]) {
        setError(field, {
          type: 'manual',
          message: 'Este campo é obrigatório',
        });
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      handleCreateUser(data);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
    }
  };

  const inputRefs = {
    username: useRef(),
    password: useRef(),
    repeat_password: useRef(),
    fullname: useRef(),
    cpf: useRef(),
    telefone: useRef(),
    email: useRef()
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        {[
          { label: 'Usuário', name: 'username', nextRef: 'password', textContentType: 'oneTimeCode' },
          { label: 'Senha', name: 'password', nextRef: 'repeat_password', secureTextEntry: true, textContentType: 'oneTimeCode' },
          { label: 'Confirmar Senha', name: 'repeat_password', nextRef: 'fullname', secureTextEntry: true, textContentType: 'oneTimeCode' },
          { label: 'Nome Completo', name: 'fullname', nextRef: 'cpf' },
          { label: 'CPF', name: 'cpf', nextRef: 'telefone' },
          { label: 'Telefone', name: 'telefone', nextRef: 'email' },
          { label: 'E-mail', name: 'email', keyboardType: 'email-address' }
        ].map((input, index) => (
          <View key={index} style={styles.box}>
            <TextInput
              label={input.label}
              style={[styles.input, errors[input.name] && styles.inputError]}
              textContentType={input.textContentType}
              secureTextEntry={input.secureTextEntry}
              keyboardType={input.keyboardType}
              onChangeText={(text) => setValue(input.name, text)}
              returnKeyType="next"
              onSubmitEditing={() => input.nextRef && inputRefs[input.nextRef].current.focus()}
              blurOnSubmit={false}
              ref={inputRefs[input.name]}
            />
            {errors[input.name] && <Text style={styles.errorText}>{errors[input.name].message}</Text>}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <ButtonSolid
            title="Criar Conta"
            useColor="rgb(0, 0, 0)"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            textStyle={styles.buttonText}
            disabled={isButtonDisabled}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.01,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.07,
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: height * 0.05,
    marginHorizontal: width * 0.2,
  },
  button: {
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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