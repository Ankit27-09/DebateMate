'use client';
import { useState } from 'react';

export default function DebatePage() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stance, setStance] = useState('pro');
  const [conversations, setConversations] = useState([]);

  const startDebate = async () => {
    if (!userInput.trim()) return;

    // Add user message to conversation
    const newUserMessage = {
      type: 'user',
      content: userInput,
      stance: stance
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
        content: data.aiResponse
      };
      
      setConversations(prev => [...prev, newAIMessage]);
    } catch (err) {
      // Add error message to conversation
      const errorMessage = {
        type: 'ai',
        content: "Unable to generate response. Please try again.",
        isError: true
      };
      
      setConversations(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      startDebate();
    }
  };

  return (
    <div className="flex p-16 flex-col h-screen bg-gray-50">
      {/* Header - Simple and clean */}
      
      
      {/* Main content area with flexible height */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Messages container with scrolling */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">Start Your Debate</h2>
                <p className="text-gray-500 max-w-md">Enter your argument below and choose your stance. The AI will provide a counterargument to challenge your thinking.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {conversations.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-lg px-4 py-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : message.isError 
                            ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none' 
                            : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      {message.type === 'user' && (
                        <div className="mb-1 text-xs text-indigo-200 font-medium">
                          Your argument ({message.stance === 'pro' ? 'Pro' : 'Con'})
                        </div>
                      )}
                      {message.type === 'ai' && !message.isError && (
                        <div className="mb-1 text-xs text-gray-500 font-medium">
                          Virtual Debater
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">
                        {message.content}
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
        </div>
        
        {/* Input area - Fixed at the bottom */}
        <div className="border-t rounded-2xl border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col space-y-3">
              {/* Stance selector */}
              <div className="flex  space-x-2">
                <h3 className='font-bold text-black/35 text-center mt-2'>Pick a side: Pros or Cons</h3>
                <button 
                  onClick={() => setStance('pro')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    stance === 'pro' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pro
                </button>
                <button 
                  onClick={() => setStance('con')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    stance === 'con' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Con
                </button>
              </div>
              
              {/* Input field and send button */}
              <div className="flex items-end space-x-3 ">
                <div className="flex-1">
                  <textarea
                    placeholder="Type your argument here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-white"
                    rows={1}
                    style={{ 
                      minHeight: '56px',
                      maxHeight: '120px',
                      height: 'auto',
                    }}
                  />
                </div>
                <button
                  onClick={startDebate}
                  disabled={loading || !userInput.trim()}
                  className={`rounded-lg p-3 mb-3 ${
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
      </main>
    </div>
  );
}