import express from 'express';
import { register, login } from '../controllers/userController';
import { addPhone, getPhones } from '../controllers/phoneController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateRegisterInput } from '../middlewares/validationMiddleware';

const router = express.Router();

// Rotas de usuário
router.post('/register', validateRegisterInput, register);
router.post('/login', login);

// Rotas de telefone (protegidas por autenticação)
router.post('/phones', authMiddleware, addPhone);
router.get('/phones/:userId', authMiddleware, getPhones);

export default router;