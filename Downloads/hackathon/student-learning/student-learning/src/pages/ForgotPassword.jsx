import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to reset password.');
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <h2 className="text-center">Password Reset</h2>

                {error && <div className="alert-error">{error}</div>}
                {message && <div className="alert-success" style={{ color: 'var(--success-color)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}

                <p className="text-center text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

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

                    <Button type="submit" disabled={loading} className="w-100 btn-gradient mt-2">
                        {loading ? 'Sending...' : 'Reset Password'}
                    </Button>
                </form>

                <div className="w-100 text-center mt-4" style={{ fontSize: '0.9rem' }}>
                    <Link to="/login" className="link-primary flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;
