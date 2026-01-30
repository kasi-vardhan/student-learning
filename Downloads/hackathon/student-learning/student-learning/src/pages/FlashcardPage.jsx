import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle, RotateCcw, ChevronLeft, ChevronRight, GraduationCap, Flame } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './FlashcardPage.css';

const FlashcardPage = ({ userStyle = 'Average Learner' }) => {
    const [inputText, setInputText] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [stats, setStats] = useState({ mastered: 0, reviewing: 0 });

    const generateFlashcards = () => {
        if (!inputText.trim()) return;
        setIsGenerating(true);

        // Simulate AI logic to extract Q&A from text
        setTimeout(() => {
            const sentences = inputText.split(/[.!?]/).filter(s => s.trim().length > 10);
            const newCards = sentences.map((s, i) => {
                const parts = s.trim().split(/ (is|are|was|were|refers to|means|defined as) /i);
                if (parts.length >= 3) {
                    return {
                        id: i,
                        front: parts[0] + "?",
                        back: parts[parts.length - 1],
                        status: 'neutral'
                    };
                }
                return {
                    id: i,
                    front: `Concept ${i + 1}`,
                    back: s.trim(),
                    status: 'neutral'
                };
            }).slice(0, 10); // Limit to 10 cards for UX

            setFlashcards(newCards);
            setCurrentIndex(0);
            setIsFlipped(false);
            setIsGenerating(false);
            setStats({ mastered: 0, reviewing: 0 });
        }, 1500);
    };

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 150);
    };

    const markStatus = (status) => {
        const updatedCards = [...flashcards];
        const oldStatus = updatedCards[currentIndex].status;
        updatedCards[currentIndex].status = status;
        setFlashcards(updatedCards);

        // Update stats
        setStats(prev => {
            const newStats = { ...prev };
            if (oldStatus === 'mastered') newStats.mastered--;
            if (oldStatus === 'reviewing') newStats.reviewing--;
            if (status === 'mastered') newStats.mastered++;
            if (status === 'reviewing') newStats.reviewing++;
            return newStats;
        });

        if (currentIndex < flashcards.length - 1) {
            handleNext();
        }
    };

    const reset = () => {
        setInputText('');
        setFlashcards([]);
        setStats({ mastered: 0, reviewing: 0 });
    };

    return (
        <div className="container section animate-in">
            <div className="flash-header mb-4">
                <div className="flex justify-center mb-2">
                    <div className="icon-badge">
                        <Flame className="text-orange-500" size={32} />
                    </div>
                </div>
                <h1>AI Flashcard Master</h1>
                <p className="text-secondary text-center">Transform notes into interactive flip-cards for **Active Recall**.</p>
            </div>

            {flashcards.length === 0 ? (
                <div className="input-section mx-auto" style={{ maxWidth: '800px' }}>
                    <Card className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-4 font-bold text-lg">
                            <Sparkles className="text-primary" size={20} />
                            <span>Input Study Material</span>
                        </div>
                        <textarea
                            className="flash-textarea"
                            placeholder="Paste your lecture notes or textbook summary here. AI will detect key definitions and concepts..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-secondary">{inputText.length} characters</span>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setInputText('')}>Clear</Button>
                                <Button onClick={generateFlashcards} disabled={!inputText || isGenerating}>
                                    {isGenerating ? 'Analyzing Concepts...' : 'Generate 3D Flashcards'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="flashcard-study-area">
                    <div className="study-sidebar">
                        <Card className="stats-card">
                            <h3>Deck Progress</h3>
                            <div className="progress-minimal">
                                <div className="progress-track">
                                    <div
                                        className="progress-bar mastered"
                                        style={{ width: `${(stats.mastered / flashcards.length) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="stats-labels">
                                    <span>{stats.mastered} Mastered</span>
                                    <span>{flashcards.length} Total</span>
                                </div>
                            </div>
                            <div className="mini-stats mt-4">
                                <div className="stat-pill mastered">
                                    <CheckCircle size={14} /> Mastered: {stats.mastered}
                                </div>
                                <div className="stat-pill review">
                                    <RotateCcw size={14} /> Review: {stats.reviewing}
                                </div>
                            </div>
                            <Button variant="outline" className="w-100 mt-6" onClick={reset}>
                                New Material
                            </Button>
                        </Card>
                    </div>

                    <div className="main-card-display">
                        <div className="card-scene">
                            <div className={`flip-card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="card-label">FRONT</div>
                                        <div className="card-content">
                                            <h2>{flashcards[currentIndex].front}</h2>
                                        </div>
                                        <div className="card-footer">Click to reveal answer</div>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="card-label">BACK</div>
                                        <div className="card-content">
                                            <p>{flashcards[currentIndex].back}</p>
                                        </div>
                                        <div className="card-footer">Click to flip back</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="study-controls mt-6">
                            <div className="flex justify-between items-center w-full">
                                <button className="nav-ctrl-btn" onClick={handlePrev}>
                                    <ChevronLeft size={24} />
                                </button>

                                <div className="action-buttons">
                                    <button
                                        className="action-btn review"
                                        onClick={(e) => { e.stopPropagation(); markStatus('reviewing'); }}
                                    >
                                        <RotateCcw size={18} /> Need to Review
                                    </button>
                                    <button
                                        className="action-btn master"
                                        onClick={(e) => { e.stopPropagation(); markStatus('mastered'); }}
                                    >
                                        <CheckCircle size={18} /> I Got It!
                                    </button>
                                </div>

                                <button className="nav-ctrl-btn" onClick={handleNext}>
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            <div className="card-counter mt-4">
                                Card {currentIndex + 1} of {flashcards.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="study-tips-banner mt-8">
                <div className="flex items-center gap-3">
                    <GraduationCap className="text-primary" />
                    <div>
                        <strong>Pro Tip for {userStyle}:</strong>
                        {userStyle === 'Fast Learner' ? ' Focus on the "Why" behind each card to maintain speed.' :
                            userStyle === 'Slow Learner' ? ' Say the answer out loud before flipping the card for better retention.' :
                                ' Space your reviews: 1 hour, 1 day, then 1 week later.'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardPage;
