// services/hospitalService.ts
import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const API_URL = 'https://factor-cadusaboya.loca.lt';

export const fetchUserHospitals = async (token: string, logout: () => void, navigation: any) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/hospitals/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user hospitals:', error);
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

export const createUserRequest = async (token: string, selectedHospitals: string[]) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/user/requests/`, {
      hospitals: selectedHospitals,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};