import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import Button from '../shared/Button';
import './ChatInterface.css';

const ChatInterface = ({ onNewRecommendation }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Urban Planning Assistant. I can help you analyze environmental data, simulate scenarios, and provide evidence-based recommendations for sustainable urban development. What would you like to explore?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `Based on the current environmental data and urban patterns, I recommend focusing on green infrastructure expansion in areas with high pollution levels. This approach can reduce local temperatures by 1.5-3°C and improve air quality by 15-20%. Would you like me to generate a detailed implementation plan?`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Where should we add new green zones?',
    'Analyze pollution hotspots',
    'Predict traffic congestion impact',
    'Simulate hospital placement'
  ];

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <Sparkles size={20} className="chat-icon" />
        <span className="chat-title">AI Assistant</span>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.role}`}>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message message-assistant">
            <div className="message-content typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="suggested-questions">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => setInput(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about urban planning strategies..."
          rows={2}
        />
        <Button
          variant="primary"
          icon={<Send size={18} />}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
