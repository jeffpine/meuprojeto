import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  try {
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (Array.isArray(users) && users.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    next(); // Chama next() para passar o controle para o próximo middleware
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return res.status(500).json({ message: 'Erro ao verificar autenticação' });
  }
};