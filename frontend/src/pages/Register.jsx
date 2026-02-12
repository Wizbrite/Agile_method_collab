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
        <div className="container-custom max-w-[900px]">
            <div className="card">
                <div className="split-left">
                    <h1 className="text-primary mb-8">REGISTER</h1>

                    {error && (
                        <div className="error-message mb-6">
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
                            className="w-full mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>

                        <p className="mt-8 text-center text-text-muted text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-primary font-bold">Login here</a>
                        </p>
                    </form>
                </div>

                <div className="split-right">
                    <h2 className="text-4xl mb-4 text-white">Join</h2>
                    <h2 className="text-4xl mb-6 text-white">Our Team</h2>
                    <p className="opacity-90">Create an account to start managing your projects with agility and style.</p>
                </div>
            </div>
        </div>
    );
}

export default Register;
