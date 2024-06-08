import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';



// API Call to get user transactions
export const fetchTransactions = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/user/transactions/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch transactions:', error);
    throw error;
  }
};