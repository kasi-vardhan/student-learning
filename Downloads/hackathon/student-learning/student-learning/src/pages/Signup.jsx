import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import './Auth.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to create an account.');
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <h2 className="text-center">Create Account</h2>

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
                        <label>Password</label>
                        <div className="input-group-icon">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-group-icon">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Confirm your password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-100 btn-gradient mt-2">
                        {loading ? 'Creating Account...' : 'Sign Up Free'}
                    </Button>
                </form>

                <div className="w-100 text-center mt-3" style={{ fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" className="link-primary">Log In</Link>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
