import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@/services/api/apiLogin';
import { checkEmptyFields } from '@/services/validateData';

const useLoginLogic = () => {
  const { register, setValue, handleSubmit: handleFormSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const { login } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setIsButtonDisabled(true);
      const token = await loginUser(data); // Try logging in
      await login(token); // Save token on Auth
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      setIsButtonDisabled(false); // Set the button back to enabled if login fails
    }
  };

  const onSubmit = (data: { username: string; password: string }) => {
    setIsButtonDisabled(true);
    clearErrors();
    let hasErrors = false;

    // Check for errors
    hasErrors = checkEmptyFields(data, setError);

    // If no errors, try to login
    if (!hasErrors) {
      handleLogin(data);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
    }
  };


  // Save fields for RHF
  useEffect(() => {
    register('username');
    register('password');
  }, [register]);

  return { onSubmit, isButtonDisabled, setValue, usernameRef, passwordRef, errors, handleSubmit: handleFormSubmit };
};

export default useLoginLogic;