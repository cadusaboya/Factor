import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const API_URL = 'https://factor-cadusaboya.loca.lt';

export const fetchUserData = async (token: string, logout: () => void, navigation: any) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/cash/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
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