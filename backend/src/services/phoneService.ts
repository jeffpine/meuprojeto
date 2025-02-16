import connection from '../database/connection';

export const createPhone = async (userId: number, name: string, phone: string) => {
  const [result] = await connection.execute(
    'INSERT INTO phones (userId, name, phone) VALUES (?, ?, ?)',
    [userId, name, phone]
  );
  return result;
};

export const getPhonesByUserId = async (userId: number) => {
  const [phones] = await connection.execute(
    'SELECT * FROM phones WHERE userId = ?',
    [userId]
  );
  return phones;
};