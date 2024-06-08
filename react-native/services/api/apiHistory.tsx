import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from '@/constants/apiUrl';

export const fetchTransactions = async (token: string, logout: () => void, navigation: any) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/user/transactions/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch transactions:', error);
    logout();
    Alert.alert(
      'Servidor indisponível', 
      'Não foi possível carregar os dados, faça login novamente. Se o problema persistir, entre em contato com o suporte',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              })
            );
          },
        },
      ]
    );
    throw error;
  }
};