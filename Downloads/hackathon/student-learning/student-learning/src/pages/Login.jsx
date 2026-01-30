import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to log in. Please check your credentials.');
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <h2 className="text-center">Welcome Back</h2>


                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-group-icon">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-1">
                            <label style={{ marginBottom: 0 }}>Password</label>
                            <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>Forgot Password?</Link>
                        </div>
                        <div className="input-group-icon">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-100 btn-gradient mt-2">
                        {loading ? 'Logging In...' : 'Log In'}
                    </Button>
                </form>

                <div className="w-100 text-center mt-3" style={{ fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/signup" className="link-primary">Sign Up Free</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
