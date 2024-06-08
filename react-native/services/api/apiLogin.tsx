import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const res = await axios.post(`${API_URL}/accounts/login/`, data);
    return res.data.token;
  } catch (error: any) {
    console.error('Failed to log in:', error);
    if (error.response?.status === 502 || error.response?.status === 504) {
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else {
      const msg = error.response?.data.message || 'Erro desconhecido';
      Alert.alert('Erro', `${msg}`);
    }
    throw error;
  }
};