import api from './client.js';

/**
 * Auth API
 * Handles authentication requests
 */

/**
 * Register new user
 * @param {Object} userData - { username, email, password }
 */
export const register = async (userData) => {
    // TODO: Implement registration (SB01)
    const response = await api.post('/auth/register', userData);
    return response.data;
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
    // TODO: Implement login and token storage (SB01)
    const response = await api.post('/auth/login', { email, password });

    // Store token in localStorage
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
    // TODO: Clear token and redirect (SB01)
    localStorage.removeItem('token');
    window.location.href = '/login';
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
    // TODO: Fetch current user (SB01)
    const response = await api.get('/auth/me');
    return response.data.user;
};
