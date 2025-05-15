'use client';
import { useState, useEffect } from 'react';

export default function DebatePage() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [stance, setStance] = useState('pro');
  const [conversations, setConversations] = useState([]);
  const [performanceStats, setPerformanceStats] = useState({
    debatesCompleted: 0,
    avgResponseLength: 0,
    mostFrequentTopics: [],
    strongestArguments: []
  });
  const [debateAnalysis, setDebateAnalysis] = useState(null);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [activeTab, setActiveTab] = useState('debate');

  // Fetch suggested topics on initial load
  useEffect(() => {
    fetchSuggestedTopics();
  }, []);

  const fetchSuggestedTopics = async () => {
    try {
      const res = await fetch('/api/suggestedtopics');
      const data = await res.json();
      setSuggestedTopics(data.topics);
    } catch (err) {
      console.error("Failed to fetch suggested topics", err);
      // Set some default topics if the API fails
      setSuggestedTopics([
        { title: "Climate Change", description: "Is climate change primarily caused by human activities?" },
        { title: "Free Speech", description: "Should there be limits on free speech?" },
        { title: "Healthcare", description: "Should healthcare be universal and government-provided?" }
      ]);
    }
  };

  const startDebate = async () => {
    if (!userInput.trim()) return;

    // Add user message to conversation
    const newUserMessage = {
      type: 'user',
      content: userInput,
      stance: stance,
      timestamp: new Date().toISOString()
    };
    
    setConversations([...conversations, newUserMessage]);
    setLoading(true);
    setUserInput(''); // Clear input after sending

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput, stance }),
      });

      const data = await res.json();
      
      // Add Virtual Debater to conversation
      const newAIMessage = {
        type: 'ai',
        content: data.aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setConversations(prev => [...prev, newAIMessage]);
      
      // Update performance stats
      updatePerformanceStats([...conversations, newUserMessage, newAIMessage]);
    } catch (err) {
      // Add error message to conversation
      const errorMessage = {
        type: 'ai',
        content: "Unable to generate response. Please try again.",
        isError: true,
        timestamp: new Date().toISOString()
      };
      
      setConversations(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const updatePerformanceStats = (updatedConversations) => {
    // Only count complete exchanges (user message followed by AI response)
    const completeDebates = Math.floor(updatedConversations.filter(msg => !msg.isError).length / 2);
    
    // Calculate average response length
    const aiResponses = updatedConversations.filter(msg => msg.type === 'ai' && !msg.isError);
    const totalLength = aiResponses.reduce((sum, msg) => sum + msg.content.length, 0);
    const avgLength = aiResponses.length > 0 ? Math.round(totalLength / aiResponses.length) : 0;
    
    // Extract keywords or topics (simple implementation)
    // In a real app, you would use NLP to extract actual topics
    const topics = ['climate change', 'education', 'healthcare', 'technology', 'economy'];
    const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // For demo purposes, pick strongest arguments from conversation
    let strongestArgs = [];
    if (updatedConversations.length >= 2) {
      strongestArgs = updatedConversations
        .filter(msg => msg.type === 'ai' && !msg.isError)
        .slice(-3)
        .map(msg => {
          // Take first sentence as summary
          const firstSentence = msg.content.split('.')[0] + '.';
          return firstSentence;
        });
    }
    
    setPerformanceStats({
      debatesCompleted: completeDebates,
      avgResponseLength: avgLength,
      mostFrequentTopics: randomTopics,
      strongestArguments: strongestArgs
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      startDebate();
    }
  };

  const selectSuggestedTopic = (topic) => {
    setUserInput(topic);
  };

  const analyzeDebate = async () => {
    if (conversations.length < 2) {
      // Not enough conversation to analyze
      return;
    }

    setAnalysisLoading(true);
    setDebateAnalysis(null);

    try {
      const res = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversations }),
      });

      const data = await res.json();
      
      if (data.error) {
        console.error('Analysis API error:', data.error);
      } else {
        setDebateAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Failed to analyze debate:', err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  // Automatically analyze debate when switching to analysis tab
  useEffect(() => {
    if (activeTab === 'analysis' && conversations.length >= 2 && !debateAnalysis) {
      analyzeDebate();
    }
  }, [activeTab]);

  return (
    
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header with tabs */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-8">
              <h1 className="text-xl font-bold text-indigo-700">DebateMentor</h1>
              <nav className="flex space-x-4">
                <button 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'debate' 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('debate')}
                >
                  Debate Arena
                </button>
                <button 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'analysis' 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('analysis')}
                >
                  Performance Analysis
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area with flexible height */}
      <main className="flex-1 flex flex-col overflow-hidden p-4 md:p-6 lg:p-8">
        {activeTab === 'debate' ? (
          <div className="flex flex-col md:flex-row gap-4 h-[90vh]">
  {/* Left side - Conversation */}
  <div className="flex-1 flex flex-col rounded-xl bg-white shadow-lg overflow-hidden">
    {/* Messages container with scrolling */}
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Start Your Debate</h2>
          <p className="text-gray-500 max-w-md">Enter your argument below and choose your stance. The AI will provide a counterargument to challenge your thinking.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {conversations.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-lg px-4 py-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                    : message.isError 
                      ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none' 
                      : 'bg-white text-gray-700 shadow-md border border-gray-100 rounded-bl-none'
                }`}
              >
                {message.type === 'user' && (
                  <div className="mb-1 text-xs text-indigo-200 font-medium">
                    Your argument ({message.stance === 'pro' ? 'Pro' : 'Con'})
                  </div>
                )}
                {message.type === 'ai' && !message.isError && (
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Virtual Debater:
                  </div>
                )}
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className="mt-1 text-xs opacity-60 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 rounded-bl-none max-w-lg">
                <div className="mb-1 text-xs text-gray-500 font-medium">
                  Virtual Debater
                </div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Input area - Fixed at the bottom */}
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="mx-auto">
        <div className="flex flex-col space-y-3">
          {/* Stance selector */}
          <div className="flex items-center space-x-3">
            <h3 className="font-medium text-gray-700">Your stance:</h3>
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button 
                onClick={() => setStance('pro')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  stance === 'pro' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-transparent text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pro
              </button>
              <button 
                onClick={() => setStance('con')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  stance === 'con' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-transparent text-gray-700 hover:bg-gray-200'
                }`}
              >
                Con
              </button>
            </div>
          </div>

          {/* Input field and send button */}
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                placeholder="Type your argument here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-white"
                rows={2}
                style={{ 
                  minHeight: '60px',
                  maxHeight: '120px',
                  height: 'auto',
                }}
              />
            </div>
            <button
              onClick={startDebate}
              disabled={loading || !userInput.trim()}
              className={`rounded-lg p-3 ${
                loading || !userInput.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
              } transition-all`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Right side - Suggested Topics */}
  <div className="hidden md:flex md:w-80 bg-white rounded-xl shadow-lg overflow-hidden flex-col">
    <div className="bg-indigo-600 text-white p-4">
      <h2 className="font-bold text-lg">Suggested Debate Topics</h2>
      <p className="text-indigo-100 text-sm">Click on a topic to start debating</p>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      {suggestedTopics && suggestedTopics.length > 0 ? (
        <ul className="space-y-2">
          {suggestedTopics.map((topic, index) => (
            <li key={index}>
              <button
                onClick={() => selectSuggestedTopic(topic.title)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors duration-150"
              >
                <p className="font-medium text-gray-800">{topic.title}</p>
                <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-gray-500">Loading suggested topics...</p>
          <button 
            onClick={fetchSuggestedTopics}
            className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  </div>
</div>

        ) : (
          /* Performance Analysis Tab */
          <div className="min-h-screen">

          <div className="bg-white min-h-screen rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Debate Performance</h2>
            
            {conversations.length < 2 ? (
              <div className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Debates to Analyze</h3>
                <p className="text-gray-500 max-w-md mx-auto">Complete at least one debate exchange in the Debate Arena to receive a performance analysis.</p>
                <button 
                  onClick={() => setActiveTab('debate')}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Go to Debate Arena
                </button>
              </div>
            ) : analysisLoading ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-700">Analyzing Your Debate...</h3>
                <p className="text-gray-500 mt-2">Please wait while our AI evaluates your performance.</p>
              </div>
            ) : !debateAnalysis ? (
              <div className="text-center py-12">
                <button 
                  onClick={analyzeDebate}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Analyze My Performance
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">Overall Performance</h3>
                      <p className="text-indigo-100">{debateAnalysis.overallScore?.explanation || "Based on your arguments and reasoning"}</p>
                    </div>
                    <div className="h-24 w-24 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md">
                      <span className="text-3xl font-bold">{debateAnalysis.overallScore?.score || "N/A"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths Card */}
                  <div className="bg-green-50 rounded-xl p-6 shadow">
                    <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Strengths
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-800">{debateAnalysis.strengths || "No strengths analysis available"}</p>
                    </div>
                  </div>
                  
                  {/* Weaknesses Card */}
                  <div className="bg-amber-50 rounded-xl p-6 shadow">
                    <h3 className="text-lg font-medium text-amber-800 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Areas for Improvement
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-800">{debateAnalysis.weaknesses || "No weaknesses analysis available"}</p>
                    </div>
                  </div>
                  
                  {/* Persuasiveness Card */}
                  <div className="bg-blue-50 rounded-xl p-6 shadow">
                    <h3 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      Persuasiveness
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-16 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                          {debateAnalysis.persuasiveness?.score || "N/A"}/10
                        </div>
                      </div>
                      <p className="text-gray-800">{debateAnalysis.persuasiveness?.explanation || "No persuasiveness analysis available"}</p>
                    </div>
                  </div>
                  
                  {/* Evidence Quality */}
                  <div className="bg-purple-50 rounded-xl p-6 shadow">
                    <h3 className="text-lg font-medium text-purple-800 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Evidence Quality
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-800">{debateAnalysis.evidenceQuality || "No evidence quality analysis available"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Improvement Areas */}
                <div className="bg-indigo-50 rounded-xl p-6 shadow">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    Key Improvement Suggestions
                  </h3>
                  {Array.isArray(debateAnalysis.improvementAreas) && debateAnalysis.improvementAreas.length > 0 ? (
                    <ul className="space-y-2">
                      {debateAnalysis.improvementAreas.map((suggestion, index) => (
                        <li key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-start">
                          <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-800">{suggestion}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-500">No specific improvement suggestions available</p>
                    </div>
                  )}
                </div>
                
                {/* Call to Action */}
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => setActiveTab('debate')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Start a New Debate
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        )}
      </main>
    </div>
  );
}