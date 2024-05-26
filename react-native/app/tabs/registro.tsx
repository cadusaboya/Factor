import * as React from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function CreateAccount() {
  const { setValue, handleSubmit } = useForm();
  const navigation = useNavigation();

  const API_URL = 'https://factor-cadusaboya.loca.lt';

  const handleCreateUser = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/users/`, data);
      console.log(res.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Erro', 'Não foi possível criar a sua conta. Por favor, tente novamente.');
    }
  };

  const onSubmit = (data) => {
    handleCreateUser(data);
  };

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const fullnameRef = React.useRef();
  const cpfRef = React.useRef();
  const telefoneRef = React.useRef();
  const emailRef = React.useRef();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <TextInput
            label="Usuário"
            style={styles.input}
            textContentType="oneTimeCode"
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
            textContentType="oneTimeCode"
            returnKeyType="next"
            onSubmitEditing={() => fullnameRef.current.focus()}
            blurOnSubmit={false}
            ref={passwordRef}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            label="Nome Completo"
            style={styles.input}
            onChangeText={(text) => setValue('fullname', text)}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current.focus()}
            blurOnSubmit={false}
            ref={fullnameRef}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            label="CPF"
            style={styles.input}
            onChangeText={(text) => setValue('cpf', text)}
            returnKeyType="next"
            onSubmitEditing={() => telefoneRef.current.focus()}
            blurOnSubmit={false}
            ref={cpfRef}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            label="Telefone"
            style={styles.input}
            onChangeText={(text) => setValue('telefone', text)}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
            ref={telefoneRef}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            label="E-mail"
            style={styles.input}
            onChangeText={(text) => setValue('email', text)}
            keyboardType="email-address"
            returnKeyType="done"
            ref={emailRef}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonSolid
            title={'Criar Conta'}
            useColor={'rgb(0, 0, 0)'}
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
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
  buttonContainer: {
    marginVertical: height * 0.05, // 5% of screen height
    marginHorizontal: width * 0.2, // 20% of screen width
  },
  button: {
    height: height * 0.07, // 7% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});