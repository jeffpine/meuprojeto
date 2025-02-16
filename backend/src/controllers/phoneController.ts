import { Request, Response } from 'express';
import { createPhone, getPhonesByUserId } from '../services/phoneService';

export const addPhone = async (req: Request, res: Response) => {
  const { userId, name, phone } = req.body;

  try {
    await createPhone(userId, name, phone);
    res.status(201).json({ message: 'Telefone adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar telefone' });
  }
};

export const getPhones = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const phones = await getPhonesByUserId(userId);
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar telefones' });
  }
};