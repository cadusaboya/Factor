// useRegisterLogic.tsx
import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { createUser } from '@/services/api/apiRegister';
import { validateCPF, checkPasswordMatch, checkEmptyFields, validateEmail } from '@/services/validateData';

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
    clearErrors();
    let hasErrors = false;

    // Check for errors
    let PasswordMatch = checkPasswordMatch(data.password, data.repeat_password, setError);
    let ValidCPF = validateCPF(data.cpf, setError);
    let ValidEmail = validateEmail(data.email, setError);
    let NoEmptyFields = checkEmptyFields(data, setError);
    
    hasErrors = PasswordMatch ||
                ValidCPF ||
                ValidEmail ||
                NoEmptyFields;

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