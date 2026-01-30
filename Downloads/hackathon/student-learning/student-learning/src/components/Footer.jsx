import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            padding: '2rem 0',
            marginTop: 'auto',
            textAlign: 'center'
        }}>
            <div className="container">
                <p>© 2026 Student Learning Style Segmentation System. All rights reserved.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>AI-Powered Education Analytics</p>
            </div>
        </footer>
    );
};

export default Footer;
