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
      setIsButtonDisabled(true); // Set the button to disabled when login starts
      const token = await loginUser(data);
      await login(token);
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
    setIsButtonDisabled(true); // Set the button to disabled when form is submitted
    clearErrors();
    let hasErrors = false;

    // Check for errors
    hasErrors = checkEmptyFields(data, setError);

    if (!hasErrors) {
      handleLogin(data);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false); // Set the button back to enabled if form validation fails
    }
  };

  useEffect(() => {
    register('username');
    register('password');
  }, [register]);

  return { onSubmit, isButtonDisabled, setValue, usernameRef, passwordRef, errors, handleSubmit: handleFormSubmit };
};

export default useLoginLogic;