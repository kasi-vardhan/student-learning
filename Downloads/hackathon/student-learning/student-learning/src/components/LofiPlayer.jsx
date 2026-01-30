import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, Volume2, X, Minimize2, Maximize2 } from 'lucide-react';
import './LofiPlayer.css';

const LofiPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isClosed, setIsClosed] = useState(localStorage.getItem('lofi_player_closed') === 'true');
    const audioRef = useRef(null);

    const tracks = [
        { name: 'Focus Lofi', url: 'https://stream.zeno.fm/0r0xa792kwzuv' },
        { name: 'Chill Beats', url: 'https://stream.zeno.fm/f37n16n938zuv' },
        { name: 'Deep Study', url: 'https://stream.zeno.fm/088b9a92kwzuv' }
    ];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying && !isClosed) {
            audioRef.current.play().catch(e => {
                console.error("Audio playback error:", e);
                setIsPlaying(false);
            });
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack, isClosed]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true);
    };

    const handleClose = () => {
        setIsClosed(true);
        setIsPlaying(false);
        localStorage.setItem('lofi_player_closed', 'true');
    };

    const handleOpen = () => {
        setIsClosed(false);
        localStorage.setItem('lofi_player_closed', 'false');
    };

    if (isClosed) {
        return (
            <button className="lofi-open-btn" onClick={handleOpen} title="Open Lofi Player">
                <Music size={20} />
            </button>
        );
    }

    return (
        <div className={`lofi-player-container ${isMinimized ? 'minimized' : ''}`}>
            <audio ref={audioRef} src={tracks[currentTrack].url} preload="none" />

            <div className="lofi-header">
                <div className="flex items-center gap-2">
                    <Music size={16} className={isPlaying ? 'animate-pulse' : ''} />
                    {!isMinimized && <span>Lofi Focus</span>}
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setIsMinimized(!isMinimized)} className="lofi-icon-btn">
                        {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                    </button>
                    <button onClick={handleClose} className="lofi-icon-btn">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <div className="lofi-body">
                    <div className="track-info">
                        <p className="track-name">{tracks[currentTrack].name}</p>
                        <p className="track-status">{isPlaying ? 'Playing Live...' : 'Paused'}</p>
                    </div>

                    <div className="lofi-controls">
                        <button onClick={togglePlay} className="lofi-main-btn">
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button onClick={nextTrack} className="lofi-secondary-btn" title="Next Track">
                            <SkipForward size={18} />
                        </button>
                    </div>

                    <div className="volume-control">
                        <Volume2 size={14} />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            )}

            {isMinimized && isPlaying && (
                <button onClick={togglePlay} className="lofi-mini-play">
                    <Pause size={14} />
                </button>
            )}
            {isMinimized && !isPlaying && (
                <button onClick={togglePlay} className="lofi-mini-play">
                    <Play size={14} />
                </button>
            )}
        </div>
    );
};

export default LofiPlayer;
