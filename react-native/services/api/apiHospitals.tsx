import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from '@/constants/apiUrl';

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

export const createUserRequest = async (token: string, selectedHospitals: string[], navigation: any) => {
  try {
      await axios.post(`${API_URL}/accounts/user/requests/`, {
      hospitals: selectedHospitals,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    Alert.alert(
      'Em análise',
      'Em breve seu saldo será atualizado',
      [
        {
          text: 'OK',
          onPress: () => {navigation.goBack();},
        },
      ]
    );

  } catch (error) {
      const errors = error.response.data;
        console.error('Error creating request:', errors);

        if (error.response.status === 502 || error.response.status === 504) {
          // Show an alert indicating failure
          Alert.alert('Erro', 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
        } else {
          Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
          console.error('Erro');
        }
  }
};