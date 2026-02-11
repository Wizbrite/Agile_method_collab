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
        <div className="container" style={{ maxWidth: '900px' }}>
            <div className="card">
                <div className="split-left">
                    <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>LOGIN</h1>

                    {error && (
                        <div className="error-message" style={{ marginBottom: '1.5rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Don't have an account?{' '}
                            <a href="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Sign Up</a>
                        </p>
                    </form>
                </div>

                <div className="split-right">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Hey</h2>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Welcome Back</h2>
                    <p style={{ opacity: 0.9 }}>Login to stay connected and keep track of your tasks effectively.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
