import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth.api.js';

/**
 * Register Page
 * Handles new user registration
 * Referenced in Sprint Backlog: SB01
 */
function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // TODO: Add password confirmation validation (SB01)
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // TODO: Implement registration logic (SB01)
            await authApi.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div className="card">
                <div className="split-left">
                    <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>REGISTER</h1>

                    {error && (
                        <div className="error-message" style={{ marginBottom: '1.5rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>

                        <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Already have an account?{' '}
                            <a href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login here</a>
                        </p>
                    </form>
                </div>

                <div className="split-right">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Join</h2>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Our Team</h2>
                    <p style={{ opacity: 0.9 }}>Create an account to start managing your projects with agility and style.</p>
                </div>
            </div>
        </div>
    );
}

export default Register;
