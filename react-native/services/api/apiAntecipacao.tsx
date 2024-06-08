import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from '@/constants/apiUrl';

interface Task {
  id: number;
  name: string;
  value: number;
  is_completed: boolean;
}

export const fetchTasks = async (
  navigation: any,
  token: string,
  logout: () => void
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
    logout();
    Alert.alert(
      'Servidor indisponível',
      'Não foi possível carregar os dados, faça login novamente. Se o problema persistir, entre em contato com o suporte',
      [
        {
          text: 'OK',
          onPress: () => {

            // Navigate back to the login page or any other desired page
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Welcome' }]
              })
            );
          }
        }
      ]
    );
    return [];
  }
};

export const confirmTasks = async (
  incompleteTasks: Task[],
  checkboxStates: boolean[],
  token: string,
  navigation: any
) => {
  try {
    const tasksToComplete = incompleteTasks.filter((task, index) => checkboxStates[index]);
    if (!tasksToComplete.length) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um pedido de antecipação');
      return;
    }

    const taskIds = tasksToComplete.map(task => task.id);

    await axios.post(`${API_URL}/tasks/update/`, { tasks: taskIds }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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
    if (error.response?.status === 502 || error.response?.status === 504) {
      console.error('Failed to confirm anticipation:', error);
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else {
      console.error('Failed to confirm anticipation:', error);
      Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
    }
  }
};