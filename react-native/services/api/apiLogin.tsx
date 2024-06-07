// services/authService.ts
import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'https://factor-cadusaboya.loca.lt';

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