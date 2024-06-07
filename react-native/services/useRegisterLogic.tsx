import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import SupportButton from '@/components/SupportButton';
import { createUser } from '@/services/api/apiRegister';

type FormData = {
  username: string;
  password: string;
  repeat_password: string;
  fullname: string;
  cpf: string;
  telefone: string;
  email: string;
};

const useRegisterLogic = () => {
  const { register, setValue, handleSubmit: handleFormSubmit, setError, clearErrors, formState: { errors } } = useForm<FormData>();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsButtonDisabled(true);
    const fieldsToCheck = ['username', 'password', 'repeat_password', 'fullname', 'cpf', 'telefone', 'email'];

    clearErrors();
    let hasErrors = false;
  
    // Check if password and repeat_password match
    if (data.password !== data.repeat_password) {
      setError('repeat_password', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });

      hasErrors = true;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'E-mail inválido',
      });

      hasErrors = true;
    }

    // Validate CPF format (numeric with 11 digits)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(data.cpf)) {
      setError('cpf', {
        type: 'manual',
        message: 'CPF inválido',
      });

      hasErrors = true;
    }
    
    // Loop through fields to check for emptiness and set errors
    fieldsToCheck.forEach(field => {
      if (!data[field]) {
        setError(field, {
          type: 'manual',
          message: 'Este campo é obrigatório',
        });
        hasErrors = true;
      }
    });
  
    // If all validations pass, proceed with user creation
    if (!hasErrors){
      try {
        await createUser(data);
        setIsButtonDisabled(false);
        navigation.goBack();
      } catch (error) {
        setIsButtonDisabled(false);
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    register('username');
    register('password');
    register('repeat_password');
    register('fullname');
    register('cpf');
    register('telefone');
    register('email');
  }, [register]);

  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const repeatPasswordRef = useRef<TextInput>(null);
  const fullnameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const telefoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  return { 
    onSubmit, 
    isButtonDisabled, 
    setValue, 
    usernameRef, 
    passwordRef, 
    repeatPasswordRef, 
    fullnameRef, 
    cpfRef, 
    telefoneRef, 
    emailRef, 
    errors, 
    handleSubmit: handleFormSubmit 
  };
};

export default useRegisterLogic;