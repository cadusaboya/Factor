import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // or fetch API if you prefer
import { useAuth } from '@/hooks/useAuth';

export default function Tab1Screen() {
  const navigation = useNavigation();
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  const { token } = useAuth(); // Retrieve the token using the useAuth hook

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const incompleteTasks = tasks.filter(task => !task.is_completed);

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: "https://factor-cadusaboya.loca.lt/tasks/",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Tasks from backend:', response.data); // Log tasks received from backend
        setTasks(response.data);
        setCheckboxStates(new Array(response.data.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle the state of the checkbox at the specified index
      return newStates;
    });
  };

  const calculateResult = () => {
    return incompleteTasks.reduce((total, task, index) => {
      return checkboxStates[index] ? total + parseFloat(task.value) : total;
    }, 0);
  };

  const handleButtonPress = () => {
    Alert.alert(
      'Sucesso',
      'Em breve o dinheiro será enviado para sua conta',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack(); // or navigation.navigate('Home') if 'Home' is the name of the main page
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <View style={styles.box}>
          <WhiteBox width={350} height={100}>
            <Text style={styles.textBox}>Saldo sendo antecipado: </Text>
            <Divider />
            <Text style={styles.text}>R$ {calculateResult()}</Text>
          </WhiteBox>
        </View>

        <View style={styles.box}>
          <WhiteBox width={350} height={360}>
            <Text style={styles.textBox}>{incompleteTasks.length} antecipações disponíveis </Text>
            <Divider />
            <ScrollView>
            {incompleteTasks.map((task, index) => (
            <View key={task.id} style={styles.option}>
              <Checkbox
                style={styles.checkbox}
                value={checkboxStates[index]}
                onValueChange={() => handleCheckboxChange(index)}
                color={checkboxStates[index] ? 'green' : undefined}
              />
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textMargin}>
                {task.name}
              </Text>
            </View>
            ))}
            </ScrollView>
          </WhiteBox>
        </View>

        <View style={styles.box}>
          <WhiteBox width={350} height={100}>
            <Text style={styles.textBox}>Valor a ser creditado na conta: </Text>
            <Divider />
            <Text style={styles.text}>R$ {(calculateResult() * 0.94).toFixed(2)}</Text>
          </WhiteBox>
        </View>

        <View style={styles.but}>
          <ButtonSolid
            title={'Confirmar antecipação'}
            useColor={'rgb(0, 0, 0)'}
            onPress={handleButtonPress}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row', // Align items horizontally
    height: 58,
    width: 290,
  },
  box: {
    marginVertical: 20,
  },
  but: {
    marginVertical: 20,
    borderRadius: 1,
  },
  text: {
    fontSize: 32,
  },
  textBox: {
    fontSize: 18,
    marginBottom: 10,
  },
  textMargin: {
    fontSize: 15,
    marginVertical: 10,
    marginLeft: 8,
  },
  checkbox: {
    marginVertical: 15,
    marginRight: 5,
  },
});