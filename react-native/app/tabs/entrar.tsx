import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

export default function CreateAccount() {
  const { register, setValue, handleSubmit, errors } = useForm(); 
  const navigation = useNavigation();
  const { login } = useAuth();
  
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  
  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/login/`, data);
      if (res.data.message === "Login successful") {
        // Store the JWT token securely (e.g., in AsyncStorage or Redux state)
        const token = res.data.token;
        await login(token); // Store the token using the login function from useAuth
        // After successful login
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ],
          })
        );
      } else {
        Alert.alert('Erro', 'Dados incorretos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Erro', 'Houve um erro durante sua solicitação, tente novamente mais tarde');
    }
  };
  
  const onSubmit = (data) => {
    handleLogin(data);
  };

    // Create refs for each input
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
  
  return (
    <View style={styles.container}>
           <View style={styles.box}>
        <TextInput
          label='Usuário'
          style={styles.input}
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
          returnKeyType="done"
          ref={passwordRef}
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
    margin: 5,
  },
  but: {
    marginVertical: 80,
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
    borderWidth: 0.2,
    height: 70,
    borderRadius: 4,
  }
});