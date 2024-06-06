import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import SupportButton from '@/components/SupportButton';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const { register, setValue, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_URL = 'https://api.factorpa.xyz';

  const handleCreateUser = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/accounts/register/`, data);
      console.log(res.data);
      setIsButtonDisabled(false);
      navigation.goBack();
    } catch (error) {
      if (error.response.status === 502 || error.response.status === 504) {
        Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
      }
      else {
        const errors = error.response.data.errors;
        console.error('Error creating user:', errors);
        if (errors.username) {
          Alert.alert('Erro', 'Usuário já existe');
        }
        else if (errors.cpf) {
          Alert.alert('Erro', 'CPF já cadastrado');
        }
        else if (errors.email) {
          Alert.alert('Erro', 'E-mail já cadastrado');
        }
        else {
          Alert.alert('Erro', 'Certifique-se que todos os campos foram preenchidos corretamente.');
        }
      }
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (data) => {
    setIsButtonDisabled(true);
    const fieldsToCheck = ['username', 'password', 'repeat_password', 'fullname', 'cpf', 'telefone', 'email'];

    clearErrors();
    let hasErrors = false;
  
    // Check if password and repeat_password match
    if (data.password !== data.repeat_password) {
      setError('repeat_password', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });

      hasErrors = true;
    }

  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'E-mail inválido',
      });

      hasErrors = true;
    }

    // Validate CPF format (numeric with 11 digits)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(data.cpf)) {
      setError('cpf', {
        type: 'manual',
        message: 'CPF inválido',
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
  
    // If all validations pass, proceed with user creation
    if (!hasErrors){
      handleCreateUser(data);
    }
    else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
      return;
    }
  };

  React.useEffect(() => {
    register('username');
    register('password');
    register('repeat_password');
    register('fullname');
    register('cpf');
    register('telefone');
    register('email');
  }, [register]);

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const fullnameRef = React.useRef();
  const cpfRef = React.useRef();
  const telefoneRef = React.useRef();
  const emailRef = React.useRef();
  const repeatpasswordRef = React.useRef();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <TextInput
            label="Usuário"
            style={[styles.input, errors.username && styles.inputError]}
            textContentType="oneTimeCode"
            onChangeText={(text) => setValue('username', text)}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
            ref={usernameRef}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            label="Senha"
            style={[styles.input, errors.password && styles.inputError]}
            onChangeText={(text) => setValue('password', text)}
            secureTextEntry={true}
            textContentType="oneTimeCode"
            returnKeyType="next"
            onSubmitEditing={() => repeatpasswordRef.current.focus()}
            blurOnSubmit={false}
            ref={passwordRef}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            label="Confirmar Senha"
            style={[styles.input, errors.repeat_password && styles.inputError]}
            onChangeText={(text) => setValue('repeat_password', text)}
            secureTextEntry={true}
            textContentType="oneTimeCode"
            returnKeyType="next"
            onSubmitEditing={() => fullnameRef.current.focus()}
            blurOnSubmit={false}
            ref={repeatpasswordRef}
          />
          {errors.repeat_password && <Text style={styles.errorText}>{errors.repeat_password.message}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            label="Nome Completo"
            style={[styles.input, errors.fullname && styles.inputError]}
            onChangeText={(text) => setValue('fullname', text)}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current.focus()}
            blurOnSubmit={false}
            ref={fullnameRef}
          />
          {errors.fullname && <Text style={styles.errorText}>{errors.fullname.message}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            label="CPF"
            style={[styles.input, errors.cpf && styles.inputError]}
            onChangeText={(text) => setValue('cpf', text)}
            returnKeyType="next"
            onSubmitEditing={() => telefoneRef.current.focus()}
            blurOnSubmit={false}
            ref={cpfRef}
          />
          {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            label="Telefone"
            style={[styles.input, errors.telefone && styles.inputError]}
            onChangeText={(text) => setValue('telefone', text)}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
            ref={telefoneRef}
          />
          {errors.telefone && <Text style={styles.errorText}>{errors.telefone.message}</Text>}
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
            title={'Criar Conta'}
            useColor={'rgb(0, 0, 0)'}
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            textStyle={styles.buttonText}
            disabled={isButtonDisabled}
          />
        </View>
      </ScrollView>
      <SupportButton />
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
    marginHorizontal: width * 0.1, // 10% of screen width
    marginVertical: height * 0.01, // 1% of screen height
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.07, // 7% of screen height
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
    marginVertical: height * 0.05, // 5% of screen height
    marginHorizontal: width * 0.2, // 20% of screen width
  },

  button: {
    height: height * 0.07, // 7% of screen height
    justifyContent: 'center',
    alignItems: 'center',
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