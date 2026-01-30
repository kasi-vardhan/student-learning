import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { addStudentData } from '../services/studentService';
import Button from '../components/Button';
import './InputPage.css';

const InputPage = ({ fetchLatestStyle }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        timeSpent: 5,
        quizScore: 75,
        attempts: 1,
        engagement: 'medium',
        consistency: 5
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addStudentData(formData);

            // Re-fetch the latest style globally so Navbar/Roadmap updates immediately
            if (fetchLatestStyle) await fetchLatestStyle();

            // Navigate to result page with result data
            navigate('/result', { state: { result, studentData: formData } });
        } catch (error) {
            console.error("Error saving data", error);
            alert("Failed to analyze data. Please try again.");
        }
    };

    return (
        <div className="input-page-wrapper">
            <div className="container section">
                <div className="text-center mb-4">
                    <h1>Student Learning Data</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Enter student metrics to analyze learning behavior.</p>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Student Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="e.g. John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                            <div className="form-group">
                                <label>Time Spent (Hours/Week)</label>
                                <input
                                    type="number"
                                    name="timeSpent"
                                    className="form-control"
                                    min="0" max="100"
                                    value={formData.timeSpent}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Quiz Score (%)</label>
                                <input
                                    type="number"
                                    name="quizScore"
                                    className="form-control"
                                    min="0" max="100"
                                    value={formData.quizScore}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                            <div className="form-group">
                                <label>Quiz Attempts</label>
                                <input
                                    type="number"
                                    name="attempts"
                                    className="form-control"
                                    min="1"
                                    value={formData.attempts}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Engagement Level</label>
                                <select
                                    name="engagement"
                                    className="form-select"
                                    value={formData.engagement}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Consistency Score (1-10)</label>
                            <div className="range-wrap">
                                <input
                                    type="range"
                                    name="consistency"
                                    min="1" max="10"
                                    style={{ width: '100%' }}
                                    value={formData.consistency}
                                    onChange={handleChange}
                                />
                                <span className="range-value">{formData.consistency}</span>
                            </div>
                        </div>

                        <Button type="submit" className="w-100" style={{ width: '100%', marginTop: '1rem' }}>
                            Analyze Learning Style <ArrowRight size={18} />
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputPage;
