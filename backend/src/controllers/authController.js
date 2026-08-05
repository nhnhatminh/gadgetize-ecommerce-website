import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import environment from "../config/environment.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const userCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Địa chỉ email này đã được sử dụng" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, role",
      [firstName, lastName, email, passwordHash, phone]
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      user: newUser.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      environment.jwt.secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT id, first_name AS \"firstName\", last_name AS \"lastName\", email, phone, role, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};