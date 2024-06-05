import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const { setValue, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_URL = 'http://factor-backend-1480867072.sa-east-1.elb.amazonaws.com:8000';

  const handleForgot = async (data) => {
    setIsButtonDisabled(true);
  
    try {
      const res = await axios.post(`${API_URL}/accounts/password_reset/`, data);
      if (res.status === 200) {
        Alert.alert('Success', 'Password reset email sent successfully');
        // Navigate to a success page or display a message to the user
      } else {
        Alert.alert('Error', 'Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error sending password reset request:', error);
      Alert.alert('Error', 'Failed to send password reset request. Please try again later.');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (data) => {
    handleForgot(data);
  };

  const usernameRef = useRef();
  const emailRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          label="Usuário"
          style={styles.input}
          onChangeText={(text) => setValue('username', text)}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
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
});