import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from '@/constants/apiUrl';

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const handleProfileError = (error, logout, navigation, setIsButtonDisabled) => {
  logout();
  Alert.alert('Servidor indisponível', 'Não foi possível carregar os dados, faça login novamente. Se o problema persistir, entre em contato com o suporte', 
  [
    {
      text: 'OK',
      onPress: () => {
        setIsButtonDisabled(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          })
        );
      },
    },
  ]);
};