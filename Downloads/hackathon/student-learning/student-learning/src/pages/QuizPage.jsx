import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, calculateScore } from '../services/quizService';
import Button from '../components/Button';
import './QuizPage.css';

const QuizPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const loadNewQuiz = () => {
        setQuestions(getQuestions(10));
        setAnswers({});
        setSubmitted(false);
        setScore(0);
    };

    useEffect(() => {
        loadNewQuiz();
    }, []);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
            questionId: parseInt(qId),
            selectedAnswer: val
        }));
        const finalScore = calculateScore(formattedAnswers);
        setScore(finalScore);
        setSubmitted(true);
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const progressPercentage = Math.min(100, (Object.keys(answers).length / 10) * 100);

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1 className="quiz-title">Knowledge Challenge</h1>
                <p className="quiz-subtitle">Test your general knowledge skills</p>
            </div>

            {!submitted ? (
                <>
                    <div className="progress-container">
                        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <div className="question-meta">
                                <span>Question {index + 1} of {questions.length}</span>
                                <span className="badge badge-fast-learner">{q.category}</span>
                            </div>
                            <div className="question-text">
                                {q.question}
                            </div>

                            <div className="options-grid">
                                {q.options.map((option, idx) => (
                                    <label key={idx} className={`option-label ${answers[q.id] === option ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            value={option}
                                            checked={answers[q.id] === option}
                                            onChange={() => handleAnswerChange(q.id, option)}
                                            className="radio-input"
                                        />
                                        <span className="option-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="quiz-footer">
                        <Button
                            onClick={handleSubmit}
                            className="w-100"
                            style={{ padding: '1rem', fontSize: '1.2rem' }}
                            disabled={Object.keys(answers).length < 10}
                        >
                            {Object.keys(answers).length < 10 ? `Answer All Questions (${Object.keys(answers).length}/10)` : 'Submit Assessment'}
                        </Button>
                    </div>
                </>
            ) : (
                <div className="result-container">
                    <div className="result-card mb-5">
                        <h2>Quiz Completed!</h2>
                        <div className="score-display">
                            {score}<span style={{ fontSize: '2rem', color: '#cbd5e1' }}>/10</span>
                        </div>
                        <p className="score-text">
                            {score >= 8 ? "Outstanding! You're a genius." :
                                score >= 5 ? "Good effort! Keep learning." : "Keep practicing to improve."}
                        </p>

                        <div className="flex justify-center gap-4" style={{ gap: '1rem', marginTop: '2rem' }}>
                            <Button onClick={handleBackToDashboard} style={{ backgroundColor: 'var(--secondary-color)' }}>
                                Dashboard
                            </Button>
                            <Button onClick={loadNewQuiz}>
                                Try Another Set
                            </Button>
                        </div>
                    </div>

                    {/* Detailed Solutions */}
                    <div className="solutions-section">
                        <h3 className="text-center mb-4">Detailed Solutions</h3>
                        {questions.map((q, index) => {
                            const userAnswer = answers[q.id];
                            const isCorrect = userAnswer === q.answer;

                            return (
                                <div key={q.id} className={`solution-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`}>
                                    <div className="solution-header">
                                        <span className="q-num">#{index + 1}</span>
                                        <span className="q-text">{q.question}</span>
                                    </div>
                                    <div className="solution-details">
                                        <div className="answer-row">
                                            <span className="label">Your Answer:</span>
                                            <span className={`value ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                                {userAnswer || 'Not Answered'}
                                            </span>
                                        </div>
                                        {!isCorrect && (
                                            <div className="answer-row">
                                                <span className="label">Correct Answer:</span>
                                                <span className="value text-success">{q.answer}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
