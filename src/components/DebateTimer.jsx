import React, { useState, useEffect, useRef } from 'react';
import './DebateTimer.css';

/**
 * DebateTimer Component
 * 
 * A customizable timer component for debate sessions that includes:
 * - Configurable time presets for different debate formats
 * - Visual and audio alerts when time is running low
 * - Pause/Resume functionality
 * - Reset capability
 */
const DebateTimer = () => {
  const [timeLeft, setTimeLeft] = useState(120); // Default 2 minutes (in seconds)
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('2min');
  const audioRef = useRef(null);
  
  // Time presets in seconds
  const timePresets = {
    '30sec': 30,
    '1min': 60,
    '2min': 120,
    '3min': 180,
    '5min': 300,
    '8min': 480
  };

  // Start or pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset timer based on current preset
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timePresets[selectedPreset]);
  };

  // Change time preset
  const changePreset = (preset) => {
    setIsRunning(false);
    setSelectedPreset(preset);
    setTimeLeft(timePresets[preset]);
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for progress bar
  const calculateProgress = () => {
    return (timeLeft / timePresets[selectedPreset]) * 100;
  };

  // Get appropriate color for timer based on time left
  const getTimerClass = () => {
    if (timeLeft <= 10) return 'timer-critical';
    if (timeLeft <= 30) return 'timer-warning';
    return 'timer-normal';
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          // Play sound alerts
          if (prevTime === 31 || prevTime === 11) {
            // This would play a sound in a real implementation
            // audioRef.current.play();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      // Play end time sound
      // audioRef.current.play();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div className="debate-timer">
      <h2>Debate Timer</h2>
      
      <div className="timer-display">
        <div className={`time ${getTimerClass()}`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="timer-progress-container">
          <div 
            className="timer-progress-bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
      
      <div className="timer-controls">
        <button 
          onClick={toggleTimer}
          className={isRunning ? 'pause' : 'play'}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        
        <button onClick={resetTimer} className="reset">
          Reset
        </button>
      </div>
      
      <div className="preset-buttons">
        {Object.keys(timePresets).map((preset) => (
          <button
            key={preset}
            onClick={() => changePreset(preset)}
            className={selectedPreset === preset ? 'active' : ''}
          >
            {preset}
          </button>
        ))}
      </div>
      
      {/* Audio element for alerts - would need actual sound files */}
      <audio ref={audioRef} />
    </div>
  );
};

export default DebateTimer;