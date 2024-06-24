export function validatePassword(password: string): void {
  const minLength = 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    throw new Error('A senha deve ter no mínimo 8 caracteres');
  }
  if (!hasLowerCase) {
    throw new Error('A senha deve conter pelo menos uma letra minúscula');
  }
  if (!hasUpperCase) {
    throw new Error('A senha deve conter pelo menos uma letra maiúscula');
  }
  if (!hasNumeric) {
    throw new Error('A senha deve conter pelo menos um número');
  }
  if (!hasSpecialChar) {
    throw new Error('A senha deve conter pelo menos um caractere especial');
  }
}
