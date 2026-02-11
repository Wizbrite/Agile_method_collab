import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth.api.js';

/**
 * Login Page
 * Handles user authentication
 * Referenced in Sprint Backlog: SB01
 */
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // TODO: Implement login logic (SB01)
            await authApi.login(email, password);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Login</h1>

            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p style={{ marginTop: '1rem' }}>
                    Don't have an account?{' '}
                    <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
