import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import {ButtonSolid} from 'react-native-ui-buttons';
import { useForm } from 'react-hook-form';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const { register, setValue, errors } = useForm();
  const onSubmit = data => Alert.alert('Form Data', data);
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // Show an alert
    Alert.alert(
      'Em análise',
      'A atualização dos seus dados será feita em breve',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to the main page
            navigation.goBack(); // or navigation.navigate('Home') if 'Home' is the name of the main page
          },
        },
      ]
    );
  };

  console.log(errors)

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label} >Novo Valor</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setValue('Usuário', text)}
        />
      </View>


      <View style={styles.but}>
      <ButtonSolid
              title={'Editar'}
              useColor={'rgb(0, 0, 0)'}
              onPress={handleButtonPress}
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
