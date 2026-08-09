import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import environment from "../config/environment.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ các thông tin bắt buộc" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Kiểm tra email và mật khẩu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Địa chỉ email không đúng định dạng" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải có tối thiểu 6 ký tự" });
    }

    // Kiểm tra email đã tồn tại
    const userCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Địa chỉ email này đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Tạo tài khoản mới
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, first_name AS "firstName", last_name AS "lastName", email, role`,
      [firstName.trim(), lastName.trim(), normalizedEmail, passwordHash, phone || null]
    );

    res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      user: newUser.rows[0],
    });
  } catch (error) {
    // Xử lý lỗi trùng email
    if (error.code === "23505") {
      return res.status(400).json({ message: "Địa chỉ email này đã được sử dụng" });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Tìm người dùng theo email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    const user = result.rows[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    // Tạo JWT
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
      'SELECT id, first_name AS "firstName", last_name AS "lastName", email, phone, role, created_at FROM users WHERE id = $1',
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

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Tìm kiếm tài khoản trong CSDL
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    const user = result.rows[0];

    // Xác thực mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Địa chỉ email hoặc mật khẩu không chính xác" });
    }

    // Kiểm tra phân quyền hệ thống quản trị
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Tài khoản của bạn không có quyền truy cập hệ thống quản trị",
      });
    }

    // Khởi tạo JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      environment.jwt.secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Đăng nhập hệ thống quản trị thành công",
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