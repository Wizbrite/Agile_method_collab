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
    // TODO: Implement user registration (SB01)
    // 1. Check if user already exists
    // 2. Hash password with bcrypt
    // 3. Create user in database
    // 4. Return user without password

    throw new Error('Not implemented - Complete this for SB01');
};

/**
 * Login user and generate JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} { user, token }
 */
export const loginUser = async (email, password) => {
    // TODO: Implement user login (SB01)
    // 1. Find user by email
    // 2. Verify password with bcrypt
    // 3. Generate JWT token
    // 4. Return user and token

    throw new Error('Not implemented - Complete this for SB01');
};

/**
 * Verify JWT token and return user
 * @param {string} token - JWT token
 * @returns {Object} User object
 */
export const verifyToken = async (token) => {
    // TODO: Implement token verification (SB01)
    // 1. Verify JWT
    // 2. Find user by ID from token
    // 3. Return user

    throw new Error('Not implemented - Complete this for SB01');
};
