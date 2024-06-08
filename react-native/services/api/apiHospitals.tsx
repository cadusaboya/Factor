import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';


// API Call to get user hospitals
export const fetchUserHospitals = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/hospitals/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user hospitals:', error);
    throw error;
  }
};

// API Call to send new User Request
export const createUserRequest = async (token: string, selectedHospitals: string[], navigation: any) => {
  try {
      await axios.post(`${API_URL}/accounts/user/requests/`, {
      hospitals: selectedHospitals, // Send the ID o the selected Hospitals
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    Alert.alert( // Show success message and redirect to home page
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

        if (error.response.status === 502 || error.response.status === 504 || error.response.status === 404) { // Server unavailable
          Alert.alert('Erro', 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
        } else { // Unexpected error
          Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
          console.error('Erro');
        }
  }
};