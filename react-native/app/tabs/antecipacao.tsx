import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { fetchTasks, confirmTasks } from '@/services/api/apiAntecipacao';
import { useCheckboxStates } from '@/hooks/useCheckboxStates';
import { handleServerError } from '@/services/handleServerError';


const { width, height } = Dimensions.get('window');

interface Task {
  id: number;
  name: string;
  value: number;
  is_completed: boolean;
}

export default function Antecipacao() {
  const navigation = useNavigation();
  const { token, logout } = useAuth();
  const { checkboxStates, toggleCheckbox } = useCheckboxStates([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const incompleteTasks = tasks.filter(task => !task.is_completed);


  // Fetch tasks from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await fetchTasks(token);
        setTasks(fetchedTasks);
        setIsButtonDisabled(false);
        setLoading(false);
      } catch(error) {
        handleServerError(logout, navigation);
      }
    };
  
    fetchData();
  }, []);

  // Calculate the total value of the selected tasks
  const calculateResult = (): number => {
    return incompleteTasks.reduce((total, task, index) => {
      return checkboxStates[index] ? total + parseFloat(task.value.toString()) : total;
    }, 0);
  };

  // Confirm the selected tasks
  const handleButtonPress = async () => {
    setIsButtonDisabled(true);
    await confirmTasks(incompleteTasks, checkboxStates, token, navigation);
    setIsButtonDisabled(false);
  };

  if (loading) {
    return (
      <View style={styles.load_container}>
        <ActivityIndicator size="large" color="#b5b5b5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <WhiteBox width={width * 0.9} height={height * 0.11}>
          <Text style={styles.textBox}>Saldo sendo antecipado: </Text>
          <Divider />
          <Text style={styles.text}>R$ {calculateResult().toFixed(2)}</Text>
        </WhiteBox>
      </View>

      <View style={styles.box}>
        <WhiteBox width={width * 0.9} height={height * 0.4}>
          <Text style={styles.textBox}>{incompleteTasks.length} antecipações disponíveis </Text>
          <Divider style={styles.divider} />
          <ScrollView>
            {incompleteTasks.map((task, index) => (
              <View key={task.id}>
                <View style={styles.option}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checkboxStates[index]}
                    onValueChange={() => toggleCheckbox(index)}
                    color={checkboxStates[index] ? 'green' : undefined}
                  />
                  <Text style={styles.textMargin}>{task.name}</Text>
                </View>
                <Divider />
              </View>
            ))}
          </ScrollView>
        </WhiteBox>
      </View>

      <View style={styles.box}>
        <WhiteBox width={width * 0.9} height={height * 0.11}>
          <Text style={styles.textBox}>Valor a ser creditado na conta: </Text>
          <Divider />
          <Text style={styles.text}>R$ {(calculateResult() * 0.94).toFixed(2)}</Text>
        </WhiteBox>
      </View>

      <View style={styles.but}>
        <ButtonSolid
          title={'Confirmar'}
          useColor={'rgb(0, 0, 0)'}
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
  load_container: {
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
  box: {
    marginVertical: height * 0.02,
  },
  but: {
    marginVertical: height * 0.01,
    borderRadius: 1,
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
  button: {
    borderRadius: 10,
    width: width * 0.8,
    // Add these lines to add shading
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,
  },
});