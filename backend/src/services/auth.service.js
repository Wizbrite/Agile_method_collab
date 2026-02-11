import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

/**
 * Auth Service
 * Handles user registration, login, and authentication logic
 */

/**
 * Register a new user
 * @param {Object} userData - { username, email, password }
 * @returns {Object} Created user (without password)
 */
export const registerUser = async (userData) => {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
        const error = new Error('User already exists with this email');
        error.status = 400;
        throw error;
    }

    // 2. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 3. Create user in database
    const user = await User.create({
        ...userData,
        password: hashedPassword
    });

    // 4. Return user without password
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
};

/**
 * Login user and generate JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} { user, token }
 */
export const loginUser = async (email, password) => {
    // 1. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }

    // 2. Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }

    // 3. Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 4. Return user and token
    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
};

/**
 * Verify JWT token and return user
 * @param {string} token - JWT token
 * @returns {Object} User object
 */
export const verifyToken = async (token) => {
    try {
        // 1. Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        // 2. Find user by ID from token
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        // 3. Return user
        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
    } catch (error) {
        const err = new Error('Invalid token');
        err.status = 401;
        throw err;
    }
};
