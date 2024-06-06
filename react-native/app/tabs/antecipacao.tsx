import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

const { width, height } = Dimensions.get('window');

export default function Antecipacao() {
  const navigation = useNavigation();
  const API_URL = 'https://api.factorpa.xyz';
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const incompleteTasks = tasks.filter(task => !task.is_completed);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTasks(response.data);
        setCheckboxStates(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar as tarefas. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [API_URL, token]);

  const handleCheckboxChange = (index) => {
    setCheckboxStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const calculateResult = () => {
    return incompleteTasks.reduce((total, task, index) => {
      return checkboxStates[index] ? total + parseFloat(task.value) : total;
    }, 0);
  };

  const handleButtonPress = async () => {
    setIsButtonDisabled(true);

    const tasksToComplete = incompleteTasks.filter((task, index) => checkboxStates[index]);

    if (tasksToComplete.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um pedido de antecipação');
      setIsButtonDisabled(false);
      return;
    }

    try {
      const taskIds = tasksToComplete.map(task => task.id);

      await axios.post(`${API_URL}/tasks/update/`, { tasks: taskIds }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      await Promise.all(tasksToComplete.map(task => (
        axios.post(`${API_URL}/tasks/user/transactions/`, {
          task: task.id,
          date: new Date().toISOString().split('T')[0],
          antecipado: task.value,
          recebido: (task.value * 0.94).toFixed(2)
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      )));

      Alert.alert(
        'Sucesso',
        'Em breve o dinheiro será enviado para sua conta',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      console.error('Failed to confirm anticipation:', error);
      Alert.alert(
        error.response?.status === 404 ? 'Servidor indisponível' : 'Erro inesperado',
        'Por favor, tente novamente mais tarde.'
      );
    } finally {
      setIsButtonDisabled(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="#b5b5b5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WhiteBox width={width * 0.9} height={height * 0.11}>
        <Text style={styles.textBox}>Saldo sendo antecipado:</Text>
        <Divider />
        <Text style={styles.text}>R$ {calculateResult().toFixed(2)}</Text>
      </WhiteBox>

      <WhiteBox width={width * 0.9} height={height * 0.4}>
        <Text style={styles.textBox}>{incompleteTasks.length} antecipações disponíveis</Text>
        <Divider style={styles.divider} />
        <ScrollView>
          {incompleteTasks.map((task, index) => (
            <View key={task.id}>
              <View style={styles.option}>
                <Checkbox
                  style={styles.checkbox}
                  value={checkboxStates[index]}
                  onValueChange={() => handleCheckboxChange(index)}
                  color={checkboxStates[index] ? 'green' : undefined}
                />
                <Text style={styles.textMargin}>{task.name}</Text>
              </View>
              <Divider />
            </View>
          ))}
        </ScrollView>
      </WhiteBox>

      <WhiteBox width={width * 0.9} height={height * 0.11}>
        <Text style={styles.textBox}>Valor a ser creditado na conta:</Text>
        <Divider />
        <Text style={styles.text}>R$ {(calculateResult() * 0.94).toFixed(2)}</Text>
      </WhiteBox>

      <View style={styles.but}>
        <ButtonSolid
          title="Confirmar"
          useColor="rgb(0, 0, 0)"
          onPress={handleButtonPress}
          disabled={isButtonDisabled}
          style={styles.button}
          textStyle={styles.buttonText}
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
    padding: width * 0.05,
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.055,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: width * 0.08,
  },
  textBox: {
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
  },
  textMargin: {
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
    flexShrink: 1,
    width: '80%',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
  },
  checkbox: {
    marginTop: height * 0.035,
  },
  but: {
    marginVertical: height * 0.01,
    borderRadius: 1,
  },
  button: {
    borderRadius: 10,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});