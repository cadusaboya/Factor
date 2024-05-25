import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

export default function Tab1Screen() {
  const navigation = useNavigation();
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);

  const incompleteTasks = tasks.filter(task => !task.is_completed);

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTasks(response.data);
        setCheckboxStates(new Array(response.data.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [API_URL, token]);

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

  const handleButtonPress = async () => {
    try {
      // Filter out tasks where checkbox is checked based on incomplete tasks
      const tasksToComplete = incompleteTasks.filter((task, index) => checkboxStates[index]);
      if (!tasksToComplete.length) {
        Alert.alert('No tasks selected', 'Please select at least one task to confirm anticipation.');
        return;
      }
  
      // Log tasksToComplete to debug
      console.log('Tasks to complete:', tasksToComplete);
  
      // Extract the IDs of the tasks to complete
      const taskIds = tasksToComplete.map(task => task.id);
      console.log('Task IDs to complete:', taskIds);
  
      // Update tasks to set is_completed to true
      await axios.post(`${API_URL}/update-tasks/`, { tasks: taskIds }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Create a transaction for each task
      await Promise.all(tasksToComplete.map(async (task) => {
        // Log the data before sending the request
        console.log("Transaction data:", {
          task: task.id,
          date: new Date().toISOString().split('T')[0],
          antecipado: task.value,
          recebido: (task.value * 0.94).toFixed(2),
          status: 'Em Análise'
        });
      
        // Send the request
        await axios.post(`${API_URL}/transactions/`, {
          task: task.id,
          date: new Date().toISOString().split('T')[0],
          antecipado: task.value,
          recebido:(task.value * 0.94).toFixed(2),
          status: 'Em Análise'
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }));
  
      // Handle success
      Alert.alert(
        'Sucesso',
        'Em breve o dinheiro será enviado para sua conta',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate("Home"); // or navigate to another screen
            },
          },
        ]
      );
    } catch (error) {
      // Handle error
      console.error('Failed to confirm anticipation:', error);
      Alert.alert('Erro', 'Não foi possível confirmar a antecipação. Por favor, tente novamente.');
    }
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
                <Text style={styles.textMargin}>
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
    flexWrap: 'wrap',
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
    marginVertical: 20,
    marginLeft: 10,
    flex: 1, // Allow the text to take up remaining space
  },
  
  checkbox: {
    marginVertical: 20,
  },
});