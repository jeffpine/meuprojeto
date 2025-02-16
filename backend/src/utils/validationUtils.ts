export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar um email
    return emailRegex.test(email);
}

export const validatePassword = (password: string): boolean => {
    return password.length >= 6; // A senha deve ter pelo menos 6 caracteres
}