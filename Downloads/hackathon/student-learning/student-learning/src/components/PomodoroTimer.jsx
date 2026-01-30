import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Study'); // Study or Break

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Switch mode
                        if (mode === 'Study') {
                            setMode('Break');
                            setMinutes(5);
                        } else {
                            setMode('Study');
                            setMinutes(25);
                        }
                        setIsActive(false);
                        // Optional: play sound notification simulation
                        alert(`${mode} session completed!`);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setMode('Study');
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className={`pomodoro-container ${mode.toLowerCase()}`}>
            <div className="timer-header">
                {mode === 'Study' ? <Zap size={18} /> : <Coffee size={18} />}
                <span>{mode} Mode</span>
            </div>
            <div className="timer-display">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="timer-controls">
                <button onClick={toggleTimer} className="control-btn play-pause">
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button onClick={resetTimer} className="control-btn reset">
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
