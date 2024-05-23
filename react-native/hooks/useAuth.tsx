import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext'; // Adjust the path as per your project structure

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};