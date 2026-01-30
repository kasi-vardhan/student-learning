import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, BarChart2, BookOpen, Share2, Lightbulb, Clock, Brain, Target, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    const { result, studentData } = location.state || {};

    if (!result) {
        return <Navigate to="/input" />;
    }

    const { learningStyle } = result;

    const getAIInsights = (style) => {
        const insights = {
            'Fast Learner': {
                method: 'Feynman Technique',
                methodDesc: 'Explain concepts in simple terms as if teaching a child to identify gaps in your understanding.',
                focus: 'Conceptual Depth & Interdisciplinary Links',
                efficiency: '92%',
                path: ['Quick review of basics', 'Deep dive into advanced applications', 'Peer teaching sessions'],
                courses: [
                    { title: 'The Feynman Technique', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=tky4f9x_Vqw' },
                    { title: 'Learning How to Learn', platform: 'Coursera', link: 'https://www.coursera.org/learn/learning-how-to-learn' }
                ]
            },
            'Highly Engaged': {
                method: 'Active Production',
                methodDesc: 'Create content, summaries, or flashcards as you learn to solidify knowledge through creation.',
                focus: 'Consistency & Research Application',
                efficiency: '88%',
                path: ['Daily goal setting', 'Participate in group discussions', 'Build a project based on learnings'],
                courses: [
                    { title: 'Deep Work Strategies', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=gT_5qz7H000' },
                    { title: 'Creative Problem Solving', platform: 'Coursera', link: 'https://www.coursera.org/learn/creative-problem-solving' }
                ]
            },
            'Slow Learner': {
                method: 'Concept Mapping',
                methodDesc: 'Use visual diagrams to connect new information with what you already know for better retention.',
                focus: 'Foundational Mastery & Visual Aids',
                efficiency: '75%',
                path: ['Break topics into micro-tasks', 'Use visual learning aids', 'Frequent low-stakes testing'],
                courses: [
                    { title: 'Mind Mapping Tutorial', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=5nTuScU70As' },
                    { title: 'Mindshift: Learning Obstacles', platform: 'Coursera', link: 'https://www.coursera.org/learn/mindshift' }
                ]
            },
            'Disengaged Learner': {
                method: 'Gamified Learning',
                methodDesc: 'Turn your study sessions into a game with rewards and clear milestones to stay motivated.',
                focus: 'Interest Discovery & Micro-Learning',
                efficiency: '45%',
                path: ['Set 10-minute timers', 'Reward your progress', 'Find real-world connections'],
                courses: [
                    { title: 'Gamification in Education', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=mOssYTimQwM' },
                    { title: 'Introduction to Psychology', platform: 'Coursera', link: 'https://www.coursera.org/learn/introduction-psych' }
                ]
            },
            'Average Learner': {
                method: 'Spaced Repetition',
                methodDesc: 'Review material at increasing intervals to move information from short-term to long-term memory.',
                focus: 'Optimization & Habit Formation',
                efficiency: '65%',
                path: ['Establish a solid routine', 'Focus on active recall', 'Analyze your mistakes weekly'],
                courses: [
                    { title: 'Spaced Repetition System', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=Z-zNHHpXoMM' },
                    { title: 'Active Recall Guide', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=msn_8as4KOs' }
                ]
            }
        };
        return insights[style] || insights['Average Learner'];
    };

    const aiInsights = getAIInsights(learningStyle);

    const getThemeClass = (style) => {
        switch (style) {
            case 'Fast Learner': return 'theme-fast';
            case 'Highly Engaged': return 'theme-engaged';
            case 'Average Learner': return 'theme-average';
            case 'Slow Learner': return 'theme-slow';
            case 'Disengaged Learner': return 'theme-disengaged';
            default: return '';
        }
    };

    const themeClass = getThemeClass(learningStyle);

    // Check if user needs improvement tips (Average or Disengaged)
    const showImprovementTips = ['Average Learner', 'Disengaged Learner', 'Slow Learner'].includes(learningStyle);

    return (
        <div className="container section">
            <div className="text-center mb-4 animate-in">
                <h1>Analysis Complete</h1>
                <p className="text-secondary">Here is the detailed segmentation report.</p>
            </div>

            <div className="grid grid-cols-2">
                <Card className={`result-card-enhanced ${themeClass} animate-in delay-1`}>
                    <div className="flex items-center gap-4 mb-4">
                        <CheckCircle size={40} color="var(--primary-color)" />
                        <div>
                            <h2 className="mb-0">Learning Style Profile</h2>
                            <p className="text-secondary" style={{ marginBottom: 0 }}>Based on behavioral analysis</p>
                        </div>
                    </div>

                    <div className="segmentation-badge">
                        <h3>{learningStyle}</h3>
                    </div>

                    <p className="mt-4">
                        The student shows characteristics of a <strong>{learningStyle}</strong>.
                        This is determined by their study time ({studentData.timeSpent} hrs),
                        consistency score ({studentData.consistency}/10),
                        and engagement levels.
                    </p>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card className="result-card-enhanced theme-metrics animate-in delay-2">
                        <h3><BarChart2 size={20} color="var(--primary-color)" /> Performance Metrics</h3>
                        <div className="metric-row flex justify-between mt-4">
                            <span>Quiz Score</span>
                            <strong>{studentData.quizScore}%</strong>
                        </div>
                        <div className="metric-row flex justify-between mt-2">
                            <span>Attempts</span>
                            <strong>{studentData.attempts}</strong>
                        </div>
                    </Card>

                    <Card className="result-card-enhanced theme-recommendations animate-in delay-3">
                        <h3><BookOpen size={20} color="var(--primary-color)" /> Recommendations</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                            {learningStyle === 'Fast Learner' && <li>Provide advanced modules to keep them engaged.</li>}
                            {learningStyle === 'Slow Learner' && <li>Suggest breakdown of complex topics into smaller chunks.</li>}
                            {learningStyle === 'Highly Engaged' && <li>Encourage peer mentoring roles.</li>}
                            {showImprovementTips && <li>Focus on structured study plans and active recall.</li>}
                            <li>Review consistency patterns weekly.</li>
                        </ul>
                    </Card>
                </div>
            </div>

            {/* AI Assessment & Advice Section */}
            <div className="ai-assessment-section animate-in delay-3" style={{ marginTop: '3rem' }}>
                <div className="ai-header mb-4">
                    <div className="flex items-center gap-2">
                        <Brain className="ai-pulse-icon" size={28} />
                        <h2 className="mb-0">AI Personalized Study Guide</h2>
                    </div>
                    <p className="text-secondary">Based on your learning profile, here is your most efficient path.</p>
                </div>

                <div className="grid grid-cols-3">
                    <Card className="ai-insight-card">
                        <div className="insight-header">
                            <Lightbulb size={24} className="text-primary" />
                            <h4>Best Study Method</h4>
                        </div>
                        <h5>{aiInsights.method}</h5>
                        <p>{aiInsights.methodDesc}</p>
                    </Card>

                    <Card className="ai-insight-card">
                        <div className="insight-header">
                            <Target size={24} className="text-primary" />
                            <h4>Concept Focus</h4>
                        </div>
                        <p className="focus-text">{aiInsights.focus}</p>
                        <div className="efficiency-box">
                            <span>Predicted Efficiency</span>
                            <div className="efficiency-bar-bg">
                                <div className="efficiency-bar-fill" style={{ width: aiInsights.efficiency }}></div>
                            </div>
                            <span className="efficiency-value">{aiInsights.efficiency}</span>
                        </div>
                    </Card>

                    <Card className="ai-insight-card">
                        <div className="insight-header">
                            <ArrowRight size={24} className="text-primary" />
                            <h4>Most Efficient Path</h4>
                        </div>
                        <ul className="path-list">
                            {aiInsights.path.map((step, index) => (
                                <li key={index}><CheckCircle size={14} className="text-success" /> {step}</li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>

            {/* Professional Study Tips Section - Animated & Attractive */}
            {showImprovementTips && (
                <div className="tips-container animate-in delay-4">
                    <div className="tips-header">
                        <h2 className="tips-title">Professional Study Strategy</h2>
                        <p className="text-secondary">Boost your learning efficiency with these proven techniques.</p>
                    </div>

                    <div className="tips-grid">
                        <div className="tip-card">
                            <div className="tip-icon"><Clock size={32} /></div>
                            <h3 className="tip-title">Pomodoro Technique</h3>
                            <p className="tip-desc">
                                Study for <strong>25 minutes</strong>, then take a <strong>5-minute break</strong>.
                                This maintains high focus and prevents burnout. After 4 cycles, take a longer break.
                            </p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon"><Brain size={32} /></div>
                            <h3 className="tip-title">Active Recall</h3>
                            <p className="tip-desc">
                                Don't just re-read. <strong>Test yourself</strong> immediately after studying.
                                Trying to retrieve information strengthens neural pathways efficiently.
                            </p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon"><Target size={32} /></div>
                            <h3 className="tip-title">Spaced Repetition</h3>
                            <p className="tip-desc">
                                Review material at increasing intervals (1 day, 3 days, 1 week).
                                This combats the "forgetting curve" and moves knowledge to long-term memory.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Resources (Courses) */}
            <div className="courses-section animate-in delay-4" style={{ marginTop: '3rem' }}>
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={28} className="text-secondary" />
                    <h2 className="mb-0">Recommended Resources</h2>
                </div>
                <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                    {aiInsights.courses.map((course, index) => (
                        <Card key={index} className="course-card">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="platform-tag">{course.platform}</span>
                                    <h4 className="mt-2">{course.title}</h4>
                                </div>
                                <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-link">
                                    <Share2 size={18} />
                                </a>
                            </div>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                A curated course to help you master your learning style.
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="actions-area animate-in delay-4">
                <Link to="/input">
                    <Button variant="outline">Analyze Another</Button>
                </Link>
                <Link to="/dashboard">
                    <Button>Go to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
};

export default ResultPage;
