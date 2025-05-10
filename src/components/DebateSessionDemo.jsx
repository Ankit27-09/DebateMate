import React, { useState } from 'react';
import DebateTimer from './DebateTimer';
import './DebateSessionDemo.css';

/**
 * DebateSessionDemo Component
 * 
 * A demo component that shows how the DebateTimer can be integrated
 * into a debate practice session interface.
 */
const DebateSessionDemo = () => {
  const [topic, setTopic] = useState('Should artificial intelligence development be regulated by governments?');
  const [debateFormat, setDebateFormat] = useState('British Parliamentary');
  const [notes, setNotes] = useState('');
  
  // Sample debate formats
  const debateFormats = [
    'British Parliamentary',
    'Public Forum',
    'Lincoln-Douglas',
    'Policy Debate',
    'World Schools',
    'Karl Popper'
  ];
  
  // Sample debate topics
  const debateTopics = [
    'Should artificial intelligence development be regulated by governments?',
    'Is social media doing more harm than good to society?',
    'Should college education be free for all citizens?',
    'Should voting be mandatory in democratic countries?',
    'Is space exploration a worthwhile investment of public resources?'
  ];
  
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  
  const handleFormatChange = (e) => {
    setDebateFormat(e.target.value);
  };
  
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  
  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * debateTopics.length);
    setTopic(debateTopics[randomIndex]);
  };

  return (
    <div className="debate-session-demo">
      <div className="debate-header">
        <h1>DebateMate Practice Session</h1>
        <p>Improve your debate skills with timed practice</p>
      </div>
      
      <div className="debate-content">
        <div className="debate-settings">
          <div className="setting-group">
            <label htmlFor="topic">Debate Topic:</label>
            <div className="topic-container">
              <select 
                id="topic" 
                value={topic} 
                onChange={handleTopicChange}
                className="topic-select"
              >
                {debateTopics.map((t, index) => (
                  <option key={index} value={t}>{t}</option>
                ))}
              </select>
              <button className="random-topic-btn" onClick={getRandomTopic}>
                Random
              </button>
            </div>
          </div>
          
          <div className="setting-group">
            <label htmlFor="format">Debate Format:</label>
            <select 
              id="format" 
              value={debateFormat} 
              onChange={handleFormatChange}
              className="format-select"
            >
              {debateFormats.map((format, index) => (
                <option key={index} value={format}>{format}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="debate-workspace">
          <div className="timer-section">
            <h2>Speech Timer</h2>
            <DebateTimer />
          </div>
          
          <div className="notes-section">
            <h2>Debate Notes</h2>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Take notes during the debate here..."
              className="debate-notes"
            />
          </div>
        </div>
      </div>
      
      <div className="debate-footer">
        <p>Select a topic, choose a format, set your timer, and start practicing!</p>
      </div>
    </div>
  );
};

export default DebateSessionDemo;