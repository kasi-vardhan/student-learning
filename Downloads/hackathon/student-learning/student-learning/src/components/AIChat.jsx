import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Clock, Zap, Table as TableIcon } from 'lucide-react';
import './AIChat.css';
import PomodoroTimer from './PomodoroTimer';

const AIChat = ({ userStyle = 'General' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `Hi! I'm your AI Study Assistant. I see your learning profile is: **${userStyle}**. How can I help you study better today?`, time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getStudyTable = (style) => {
        const tables = {
            'Fast Learner': [
                { time: '08:00 AM', activity: 'Deep Work: Core Concepts' },
                { time: '10:00 AM', activity: 'Advanced Problem Solving' },
                { time: '12:00 PM', activity: 'Peer Mentoring / Teaching' },
                { time: '02:00 PM', activity: 'Exploratory Research' }
            ],
            'Slow Learner': [
                { time: '09:00 AM', activity: 'Flashcard Review (Active Recall)' },
                { time: '10:30 AM', activity: 'Micro-learning: 1 Major Concept' },
                { time: '01:00 PM', activity: 'Visual Mapping Session' },
                { time: '03:00 PM', activity: 'Review & Quiz' }
            ],
            'Highly Engaged': [
                { time: '07:30 AM', activity: 'Morning Goal Setting' },
                { time: '09:00 AM', activity: 'Intensive Study Block' },
                { time: '12:00 PM', activity: 'Collaborative Project Work' },
                { time: '04:00 PM', activity: 'Daily Reflection & Planning' }
            ],
            'Disengaged Learner': [
                { time: '10:00 AM', activity: '15-min Mini Sprint' },
                { time: '11:30 AM', activity: 'Gamified Quiz session' },
                { time: '02:00 PM', activity: 'Interactive Video Learning' },
                { time: '04:00 PM', activity: 'Review Progress & Reward' }
            ],
            'Average Learner': [
                { time: '09:00 AM', activity: 'Pomodoro Session (4 Cycles)' },
                { time: '11:30 AM', activity: 'Core Subject Review' },
                { time: '02:00 PM', activity: 'Structured Practice Test' },
                { time: '04:00 PM', activity: 'Summary Writing' }
            ]
        };
        return tables[style] || tables['Average Learner'];
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input, time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Logic
        setTimeout(() => {
            let botText = "";
            let table = null;
            const query = userMsg.text.toLowerCase();

            if (query.includes('table') || query.includes('schedule') || query.includes('timetable')) {
                botText = `Here is a personalized study schedule optimized for a **${userStyle}**:`;
                table = getStudyTable(userStyle);
            } else if (query.includes('efficiency') || query.includes('study well') || query.includes('how to study')) {
                if (userStyle === 'Fast Learner') {
                    botText = "To maximize your efficiency, use the **Feynman Technique**. Teach complex topics to someone else to find your knowledge gaps. Also, try interleaving subjects to keep your brain challenged.";
                } else if (userStyle === 'Slow Learner') {
                    botText = "Focus on **Concept Mapping**. Don't rush through chapters. Use visual aids to connect new data to existing knowledge. Break topics into 10-minute blocks.";
                } else {
                    botText = "The **Pomodoro Technique** combined with **Active Recall** is your best bet. Study for 25 mins, break for 5. Always test yourself before you think you're ready.";
                }
            } else {
                botText = "I can provide you with a personalized study table or suggest the most efficient study methods for your learning style. Just ask!";
            }

            const botMsg = { id: Date.now() + 1, type: 'bot', text: botText, table, time: new Date() };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="ai-chat-container">
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
                    <MessageSquare size={24} />
                    <span className="btn-label">Study AI</span>
                </button>
            )}

            {isOpen && (
                <div className="chat-window animate-slide-up">
                    <div className="chat-header">
                        <div className="flex items-center gap-2 text-white">
                            <Bot size={20} />
                            <span>AI Study Assistant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowTimer(!showTimer)} className={`timer-toggle-mini ${showTimer ? 'active' : ''}`} title="Pomodoro Timer">
                                <Clock size={18} />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="close-btn">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {showTimer && <PomodoroTimer />}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                                <div className="message-icon">
                                    {msg.type === 'bot' ? <Bot size={14} /> : <User size={14} />}
                                </div>
                                <div className="message-content">
                                    <div className="text">{msg.text}</div>
                                    {msg.table && (
                                        <div className="study-table-mini">
                                            {msg.table.map((row, i) => (
                                                <div key={i} className="table-row">
                                                    <span className="time">{row.time}</span>
                                                    <span className="activity">{row.activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="time-stamp">
                                        {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-wrapper bot">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <div className="input-suggestions">
                            <button onClick={() => setInput("Give me a study table")}>📅 Schedule</button>
                            <button onClick={() => setInput("How to increase efficiency?")}>⚡ Efficiency</button>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={handleSend} className="send-btn">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChat;
