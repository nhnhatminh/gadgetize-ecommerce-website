import pool from '../config/database.js';
import crypto from 'crypto';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  
  try {
    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = hashPassword(password);
    
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, role',
      [firstName, lastName, email, hashedPassword, phone]
    );

    res.status(201).json({
      status: 'success',
      data: newUser.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const userRes = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $1',
      [emailOrPhone]
    );

    if (userRes.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userRes.rows[0];
    const hashedPassword = hashPassword(password);

    if (user.password_hash !== hashedPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};