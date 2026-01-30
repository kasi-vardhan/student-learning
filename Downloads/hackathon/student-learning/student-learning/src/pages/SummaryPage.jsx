import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './SummaryPage.css';

const SummaryPage = ({ userStyle = 'Average Learner' }) => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!text.trim()) return;

        setIsGenerating(true);

        // Simulate AI summarization logic tailored to learning style
        setTimeout(() => {
            let result = "";
            const sentences = text.split('.').filter(s => s.trim().length > 5);

            if (userStyle === 'Fast Learner') {
                // High-level conceptual summary
                result = "### Execution Summary (Conceptual)\n" +
                    sentences.slice(0, 3).map(s => `* **Key Principle**: ${s.trim()}`).join('\n') +
                    "\n\n**Deep Dive Recommendation**: Connect these concepts to interdisciplinary applications.";
            } else if (userStyle === 'Slow Learner') {
                // Step-by-step broken down summary
                result = "### Study Breakdown (Step-by-Step)\n" +
                    sentences.slice(0, 4).map((s, i) => `${i + 1}. **Phase ${i + 1}**: ${s.trim()}`).join('\n') +
                    "\n\n**Visual Aid**: Try drawing a concept map for these 4 points.";
            } else {
                // Balanced bullet points
                result = "### Core Insights\n" +
                    sentences.slice(0, 4).map(s => `• ${s.trim()}`).join('\n') +
                    "\n\n**Efficiency Tip**: Use the Pomodoro technique to review these points.";
            }

            setSummary(result);
            setIsGenerating(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const reset = () => {
        setText('');
        setSummary('');
    };

    return (
        <div className="container section animate-in">
            <div className="summary-header mb-4">
                <Sparkles className="text-primary animate-pulse" size={32} />
                <h1>AI Smart Summary Generator</h1>
                <p className="text-secondary">Paste your study material below, and I'll condense it based on your **{userStyle}** profile.</p>
            </div>

            <div className="grid grid-cols-2">
                <div className="input-area">
                    <Card className="summary-card">
                        <div className="card-header">
                            <FileText size={18} />
                            <span>Input Material</span>
                        </div>
                        <textarea
                            placeholder="Paste your notes, articles, or textbook chapters here (min 50 words recommended)..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="summary-textarea"
                        />
                        <div className="flex justify-between items-center mt-4">
                            <span className="word-count">{text.split(/\s+/).filter(w => w).length} words</span>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={reset} disabled={!text}>
                                    <RotateCcw size={16} /> Reset
                                </Button>
                                <Button onClick={handleGenerate} disabled={!text || isGenerating}>
                                    {isGenerating ? 'Processing...' : 'Generate Summary'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="output-area">
                    <Card className="summary-card output">
                        <div className="card-header">
                            <Sparkles size={18} />
                            <span>AI Curated Summary</span>
                            {summary && (
                                <button className="copy-btn" onClick={copyToClipboard} title="Copy to Clipboard">
                                    {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>

                        <div className="summary-content">
                            {!summary && !isGenerating && (
                                <div className="placeholder-content">
                                    <AlertCircle size={40} className="text-secondary opacity-20" />
                                    <p>Your AI-generated summary will appear here once you provide input.</p>
                                </div>
                            )}

                            {isGenerating && (
                                <div className="loading-container">
                                    <div className="ai-loading-bar"></div>
                                    <p>Analyzing context and optimizing for {userStyle}...</p>
                                </div>
                            )}

                            {summary && (
                                <div className="result-markdown">
                                    {summary.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SummaryPage;
