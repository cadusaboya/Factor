// Validate email: contain @ and .
export function validateEmail(email: string, setError: Function): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  if (!isValid) {
    setError('email', {
      type: 'manual',
      message: 'E-mail inválido',
    });
  }
  return !isValid;
}

// Check if there are empty fields
export function checkEmptyFields(data: Record<string, string>, setError: Function): boolean {
    let hasErrors = false;
  
    Object.entries(data).forEach(([field, value]) => {
      if (!value) {
        setError(field, {
          type: 'manual',
          message: 'Este campo é obrigatório',
        });
        hasErrors = true;
      }
    });
  
    return hasErrors;
  }

// Validate CPF: must have 11 digits
export function validateCPF(cpf: string, setError: Function): boolean {
    const cpfRegex = /^\d{11}$/;
    const isValid = cpfRegex.test(cpf);
    if (!isValid) {
      setError('cpf', {
        type: 'manual',
        message: 'CPF inválido',
      });
    }
    return !isValid;
}

// Check if password and repeat password match
export function checkPasswordMatch(password: string, repeatPassword: string, setError: Function): boolean {
    const isValid = password === repeatPassword;
    if (!isValid) {
      setError('repeat_password', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });
    }
    return !isValid;
}