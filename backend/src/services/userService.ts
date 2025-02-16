import connection from '../database/connection';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await connection.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return result;
};

export const loginUser = async (email: string, password: string) => {
  const [users] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (Array.isArray(users) && users.length > 0) {
    const user = users[0] as any;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return { id: user.id, email: user.email };
    }
  }
  return null;
};