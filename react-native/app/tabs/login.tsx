import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import SupportButton from '@/components/SupportButton';
import useLoginLogic from '@/services/useLoginLogic';
import navigate from '@/services/navigateButton';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const { onSubmit, isButtonDisabled, setValue, usernameRef, passwordRef, errors, handleSubmit } = useLoginLogic();
  const { handleNavigate } = navigate();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          label="Usuário"
          style={[styles.input, errors.username && styles.inputError]}
          onChangeText={(text: string) => setValue('username', text)}
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
          onChangeText={(text: string) => setValue('password', text)}
          secureTextEntry={true}
          returnKeyType="done"
          ref={passwordRef}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        <TouchableOpacity onPress={() => handleNavigate('Esqueci minha senha')}>
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

      <SupportButton />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.01,
  },
  buttonContainer: {
    marginVertical: height * 0.1,
    marginHorizontal: width * 0.2,
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
    color: 'blue',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.08,
    borderRadius: 4,
  },
  button: {
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default Login;