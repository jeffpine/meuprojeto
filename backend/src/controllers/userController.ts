import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await registerUser(email, password);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};