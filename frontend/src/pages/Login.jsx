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
        <div className="container-custom max-w-[900px]">
            <div className="card">
                <div className="split-left">
                    <h1 className="text-primary mb-8">LOGIN</h1>

                    {error && (
                        <div className="error-message mb-6">
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
                            className="w-full mt-4"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <p className="mt-8 text-center text-text-muted text-sm">
                            Don't have an account?{' '}
                            <a href="/register" className="text-primary font-bold">Sign Up</a>
                        </p>
                    </form>
                </div>

                <div className="split-right">
                    <h2 className="text-4xl mb-4 text-white">Hey</h2>
                    <h2 className="text-4xl mb-6 text-white">Welcome Back</h2>
                    <p className="opacity-90">Login to stay connected and keep track of your tasks effectively.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
