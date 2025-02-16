import {Request, Response, NextFunction } from "express";
import connection from "../database/connection";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId = req.headers["user-id"];

    if (!userId) {
        res.status(401).json({ message: "Usuário não autenticado" });
    }

    try {
        const [users] = await connection.execute(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );
        
        if (Array.isArray(users) && users.length === 0) {
            res.status(401).json({ message: "Usuário não encontrado" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Erro ao verificar usuário" });
    }
};
