import * as React from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function CreateAccount() {
  const { register, setValue, handleSubmit, errors } = useForm(); // Added handleSubmit here
  const navigation = useNavigation();

  const API_URL = 'https://factor-cadusaboya.loca.lt';

  const handleCreateUser = async (data) => { // Accept data as argument
    try {
      const res = await axios.post(`${API_URL}/users/`, data); // Use data object directly
      console.log(res.data);
      navigation.goBack(); // Navigate back after successful creation
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Erro', 'Não foi possível criar a sua conta. Por favor, tente novamente.');
    }
  };

  const onSubmit = (data) => { // Accept data as argument
    handleCreateUser(data); // Pass data to handleCreateUser function
  };
  

  // Create refs for each input
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const fullnameRef = React.useRef();
  const cpfRef = React.useRef();
  const telefoneRef = React.useRef();
  const emailRef = React.useRef();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.box}>
        <TextInput
          label='Usuário'
          style={styles.input}
          textContentType="oneTimeCode"
          onChangeText={text => setValue('username', text)}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label='Senha'
          style={styles.input}
          onChangeText={(text) => setValue('password', text)}
          secureTextEntry={true}
          textContentType="oneTimeCode"
          returnKeyType="next"
          onSubmitEditing={() => fullnameRef.current.focus()}
          blurOnSubmit={false}
          ref={passwordRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label='Nome Completo'
          style={styles.input}
          onChangeText={text => setValue('fullname', text)}
          returnKeyType="next"
          onSubmitEditing={() => cpfRef.current.focus()}
          blurOnSubmit={false}
          ref={fullnameRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label='CPF'
          style={styles.input}
          onChangeText={text => setValue('cpf', text)}
          returnKeyType="next"
          onSubmitEditing={() => telefoneRef.current.focus()}
          blurOnSubmit={false}
          ref={cpfRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label='Telefone'
          style={styles.input}
          onChangeText={text => setValue('telefone', parseFloat(text))}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
          ref={telefoneRef}
        />
      </View>

      <View style={styles.box}>
        <TextInput
          label='E-mail'
          style={styles.input}
          onChangeText={text => setValue('email', text)}
          keyboardType="email-address"
          returnKeyType="done"
          ref={emailRef}
        />
      </View>

      <View style={styles.but}>
        <ButtonSolid
          title={'Criar Conta'}
          useColor={'rgb(0, 0, 0)'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  labelx: {
    margin: 20,
    marginLeft: 0,
  },
  box: {
    marginHorizontal: 30,
    margin: 5,
  },
  but: {
    marginVertical: 80,
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: '#E7E7E7',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: 60,
    borderRadius: 4,
  }
});