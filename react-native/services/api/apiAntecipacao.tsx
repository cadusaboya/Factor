import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';

interface Task {
  id: number;
  name: string;
  value: number;
  is_completed: boolean;
}

// API Call to get user tasks
export const fetchTasks = async (
  token: string,
): Promise<Task[]> => {


  try {
    const response = await axios.get<Task[]>(`${API_URL}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};


// API Call to confirm tasks
export const confirmTasks = async (
  incompleteTasks: Task[],
  checkboxStates: boolean[],
  token: string,
  navigation: any
) => {
  try {
    // Get the tasks that user checked
    const tasksToComplete = incompleteTasks.filter((task, index) => checkboxStates[index]); 
    
    // Check if at least one task was selected
    if (!tasksToComplete.length) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um pedido de antecipação');
      return;
    }

    // Get the ids of the tasks to be completed
    const taskIds = tasksToComplete.map(task => task.id);


    // Set the selected tasks to completed
    await axios.post(`${API_URL}/tasks/update/`, { tasks: taskIds }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Create a user transaction for each selected task 
    await Promise.all(
      tasksToComplete.map(async task => {
        await axios.post(
          `${API_URL}/tasks/user/transactions/`,
          {
            task: task.id,
            date: new Date().toISOString().split('T')[0],
            antecipado: task.value,
            recebido: (task.value * 0.94).toFixed(2)
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      })
    );

    Alert.alert('Sucesso', 'Em breve o dinheiro será enviado para sua conta', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Home');
        }
      }
    ]);
  } catch (error: any) {
    // Server Unavailable
    if (error.response?.status === 502 || error.response?.status === 504 || error.response.status === 404) {
      console.error('Failed to confirm anticipation:', error);
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else { // Unexpected Error
      console.error('Failed to confirm anticipation:', error);
      Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
    }
  }
};