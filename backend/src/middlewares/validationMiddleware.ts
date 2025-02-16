import { Request, Response, NextFunction } from 'express';
import { validateEmail, validatePassword } from '../utils/validationUtils';

export const validateRegisterInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Email inválido' }); // Retorna uma resposta diretamente
  }

  if (!validatePassword(password)) {
    res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' }); // Retorna uma resposta diretamente
  }

  next(); // Chama next() para passar o controle para o próximo middleware
};