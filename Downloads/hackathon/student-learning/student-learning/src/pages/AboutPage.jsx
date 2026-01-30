import React from 'react';
import { BookOpen, Target, Cpu, Sparkles } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="container">
                <div className="about-hero">
                    <div className="floating">
                        <Sparkles className="icon-cyan" style={{ width: '48px', height: '48px', margin: '0 auto 20px' }} />
                    </div>
                    <h1>About the Platform</h1>
                </div>

                <div className="about-grid">
                    <div className="about-card animate-1">
                        <div className="vibrant-icon icon-blue">
                            <BookOpen size={24} />
                        </div>
                        <h3>Our Discovery</h3>
                        <p>
                            The Student Learning Style Segmentation platform is designed to understand how students learn and interact with educational content.
                            It analyzes learning behavior, engagement patterns, and performance trends to identify different learning styles among students.
                        </p>
                    </div>

                    <div className="about-card animate-2">
                        <div className="vibrant-icon icon-purple">
                            <Cpu size={24} />
                        </div>
                        <h3>The Technology</h3>
                        <p>
                            This platform is built with a modern React frontend and a full **Firebase** backend.
                            It utilizes intelligent segmentation logic to categorize students based on behavioral analytics,
                            and features a distraction-free study suite including AI summaries and 3D flashcards.
                        </p>
                    </div>

                    <div className="about-card animate-3">
                        <div className="vibrant-icon icon-cyan">
                            <Target size={24} />
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            By combining technology and education, this platform aims to support personalized learning and help educators better understand student learning patterns,
                            providing personalized learning recommendations for every student's unique journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
