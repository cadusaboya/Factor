import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'https://factor-cadusaboya.loca.lt';

export const sendPasswordResetRequest = async (data: { username: string; email: string; }) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/password_reset/`, data);
    return response.data;
  } catch (error) {
    if (error.response.status === 502 || error.response.status === 504) {
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else if (error.response.status === 400) {
      Alert.alert('Erro', 'Combinação de usuário e e-mail não encontrada');
    } else {
      console.error('Error sending password reset request:', error);
      Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
    }
    throw error;
  }
};