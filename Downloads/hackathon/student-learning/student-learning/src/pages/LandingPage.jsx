import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, BarChart3, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            AI-Powered Student <span className="highlight">Learning Style</span> Segmentation
                        </h1>
                        <p className="hero-subtitle">
                            Understand how students learn and personalize education using advanced machine learning algorithms.
                            Unlock insights into behavioral patterns and engagement levels.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/input">
                                <Button>
                                    Get Started <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button variant="outline">View Dashboard</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="illustration-placeholder">
                            <Brain size={120} color="var(--primary-color)" strokeWidth={1} />
                            <div className="floating-card c1">
                                <BarChart3 size={24} color="#10b981" />
                                <span>Performance</span>
                            </div>
                            <div className="floating-card c2">
                                <Users size={24} color="#f59e0b" />
                                <span>Segmentation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Use Our Platform?</h2>
                        <p>Leverage the power of AI to transform educational insights.</p>
                    </div>

                    <div className="grid grid-cols-3">
                        <Card className="feature-card">
                            <div className="feature-icon icon-blue">
                                <Brain size={32} />
                            </div>
                            <h3>Behavioral Analysis</h3>
                            <p>Analyze time spent, quiz attempts, and consistency to understand student engagement levels deeply.</p>
                        </Card>

                        <Card className="feature-card">
                            <div className="feature-icon icon-green">
                                <Users size={32} />
                            </div>
                            <h3>ML-Based Segmentation</h3>
                            <p>Cluster students into distinct learning styles (e.g., Fast Learners, Hands-on) using K-Means algorithms.</p>
                        </Card>

                        <Card className="feature-card">
                            <div className="feature-icon icon-orange">
                                <BarChart3 size={32} />
                            </div>
                            <h3>Personalized Insights</h3>
                            <p>Get actionable recommendations for each learning style to improve curriculum effectiveness.</p>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
