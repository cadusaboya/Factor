import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'https://factor-cadusaboya.loca.lt';

export const createUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/accounts/register/`, data);
    return res.data;
  } catch (error) {
    if (error.response.status === 502 || error.response.status === 504) {
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else {
      const errors = error.response.data.errors;
      console.error('Error creating user:', errors);
      if (errors.username) {
        Alert.alert('Erro', 'Usuário já existe');
      } else if (errors.cpf) {
        Alert.alert('Erro', 'CPF já cadastrado');
      } else if (errors.email) {
        Alert.alert('Erro', 'E-mail já cadastrado');
      } else {
        Alert.alert('Erro', 'Certifique-se que todos os campos foram preenchidos corretamente.');
      }
    }
    throw error;
  }
};