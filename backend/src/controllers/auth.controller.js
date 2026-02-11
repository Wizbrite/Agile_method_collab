import * as authService from '../services/auth.service.js';

/**
 * Auth Controller
 * Handles HTTP requests for authentication
 */

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // TODO: Add input validation (SB01)

        const user = await authService.registerUser({ username, email, password });

        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // TODO: Add input validation (SB01)

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            message: 'Login successful',
            ...result
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: error.message });
    }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
    try {
        // TODO: Get user from req.user (set by auth middleware)
        res.status(200).json({
            user: req.user || null
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: error.message });
    }
};
