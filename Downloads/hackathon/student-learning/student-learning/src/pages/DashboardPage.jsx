import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudentData } from '../services/studentService';
import Card from '../components/Card';
import { BarChart3, Users, Clock, CheckCircle, Award, TrendingUp, UserPlus, Users2, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardPage.css';

const DashboardPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this analysis?")) {
            try {
                await deleteStudentData(id);
                setStudents(students.filter(s => s.id !== id));
            } catch (error) {
                console.error("Failed to delete analysis", error);
                alert("Failed to delete analysis. Please try again.");
            }
        }
    };

    const totalStudents = students.length;
    const fastLearnersCount = students.filter(s => s.learningStyle === 'Fast Learner').length;
    const consistentStudents = students.filter(s => Number(s.consistency) > 7).length;

    // Analytics Data (Latest 7 results)
    const chartData = [...students].reverse().slice(-7).map((s, i) => ({
        name: `Day ${i + 1}`,
        score: s.quizScore,
        consistency: s.consistency * 10
    }));

    // Achievement Badges Logic
    const badges = [];
    if (totalStudents >= 1) badges.push({ id: 1, name: 'First Analysis', icon: <Award />, desc: 'Completed your first student analysis.' });
    if (consistentStudents >= 1) badges.push({ id: 2, name: 'Consistency King', icon: <TrendingUp />, desc: 'Found a student with 7+ consistency.' });
    if (fastLearnersCount >= 1) badges.push({ id: 3, name: 'Talent Scout', icon: <UserPlus />, desc: 'Identified a Fast Learner.' });

    // AI Smart Grouping Logic
    const getSmartGroups = () => {
        const fast = students.filter(s => s.learningStyle === 'Fast Learner');
        const slow = students.filter(s => s.learningStyle === 'Slow Learner');
        const groups = [];
        if (fast.length > 0 && slow.length > 0) {
            groups.push({ id: 1, mentor: fast[0].name, students: slow.slice(0, 3).map(s => s.name) });
        }
        return groups;
    };
    const smartGroups = getSmartGroups();

    if (loading) return <div className="container section text-center">Loading dashboard...</div>;

    return (
        <div className="dashboard-wrapper">
            <div className="container section">
                {/* Featured Quiz Banner */}
                <div className="quiz-banner mb-5 p-4 rounded-xl flex justify-between items-center text-white"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-white">General Knowledge Challenge</h2>
                        <p className="opacity-90 mb-0">Test your knowledge with 100+ random questions!</p>
                    </div>
                    <Link to="/quiz" className="btn bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors border-none">
                        Start Quiz Now
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h1>Instructor Dashboard</h1>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-3 mb-4">
                    <Card className="stat-card">
                        <div className="flex items-center gap-4">
                            <div className="stat-icon icon-blue">
                                <Users size={32} />
                            </div>
                            <div>
                                <h3>{totalStudents}</h3>
                                <p className="text-secondary">Total Students</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="flex items-center gap-4">
                            <div className="stat-icon icon-green">
                                <BarChart3 size={32} />
                            </div>
                            <div>
                                <h3>{fastLearnersCount}</h3>
                                <p className="text-secondary">Fast Learners</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="flex items-center gap-4">
                            <div className="stat-icon icon-orange">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h3>{consistentStudents}</h3>
                                <p className="text-secondary">High Consistency</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-2 mb-4">
                    {/* Analytics Chart */}
                    <Card className="chart-card">
                        <h2><TrendingUp size={20} className="text-primary" /> Performance Trends</h2>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="consistency" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Achievements / Badges */}
                    <Card className="achievements-card">
                        <h2><Award size={20} className="text-warning" /> My Achievements</h2>
                        <div className="badges-list">
                            {badges.map(badge => (
                                <div key={badge.id} className="badge-item">
                                    <div className="badge-icon-bg">{badge.icon}</div>
                                    <div className="badge-info">
                                        <h4>{badge.name}</h4>
                                        <p>{badge.desc}</p>
                                    </div>
                                </div>
                            ))}
                            {badges.length === 0 && <p className="text-secondary">Start analyzing to earn badges!</p>}
                        </div>
                    </Card>
                </div>

                {/* Smart Grouping Section */}
                {smartGroups.length > 0 && (
                    <Card className="grouping-card mb-4" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                        <h2><Users2 size={20} className="text-blue-600" /> AI Smart Grouping Suggestion</h2>
                        <div className="group-suggestion">
                            <div className="mentor-chip">
                                <span>Mentor: <strong>{smartGroups[0].mentor}</strong></span>
                            </div>
                            <div className="mentee-list">
                                <span>Suggested Study Partners: </span>
                                {smartGroups[0].students.map((s, i) => (
                                    <span key={i} className="mentee-tag">{s}</span>
                                ))}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Students Table */}
                <Card className="table-card">
                    <h2>Recent Analysis</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quiz Score</th>
                                    <th>Study Time</th>
                                    <th>Consistency</th>
                                    <th>Learning Style</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.quizScore}%</td>
                                        <td>{student.timeSpent} hrs</td>
                                        <td>{student.consistency}/10</td>
                                        <td>
                                            <span className={`badge badge-${student.learningStyle.toLowerCase().replace(' ', '-')}`}>
                                                {student.learningStyle}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(student.id)}
                                                title="Delete Analysis"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">No student data available yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
