import React, { useState } from 'react';
import { Send, Brain, Zap, TreePine, Building2, Car, Recycle, Hospital } from 'lucide-react';
import './EarthLLM.css';

const EarthLLM = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am the Earth Urban Planning AI. I analyze real-time data from satellites, sensors, and cameras to provide optimal urban development strategies. How can I help optimize your city today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: <TreePine size={16} />, label: 'Optimize Green Zones', action: 'green-zones' },
    { icon: <Hospital size={16} />, label: 'Hospital Placement', action: 'hospitals' },
    { icon: <Car size={16} />, label: 'Traffic Flow', action: 'traffic' },
    { icon: <Recycle size={16} />, label: 'Waste Management', action: 'waste' },
    { icon: <Building2 size={16} />, label: 'Urban Expansion', action: 'expansion' },
    { icon: <Zap size={16} />, label: 'Energy Grid', action: 'energy' }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Green Zone Expansion Priority',
      impact: 'Air Quality +25%, Temperature -3°C',
      location: 'District 5 & 7',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Smart Traffic System Implementation',
      impact: 'Traffic Flow +30%, Emissions -18%',
      location: 'Central Business District',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Waste Processing Facility Upgrade',
      impact: 'Efficiency +40%, Environmental Impact -50%',
      location: 'Industrial Zone B',
      priority: 'high'
    }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `Based on current satellite data and sensor readings, I recommend implementing smart green infrastructure in the specified areas. This will reduce urban heat islands by 2.5°C and improve air quality by 20%. The optimal placement considers wind patterns, population density, and existing infrastructure. Would you like me to generate a detailed implementation timeline?`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="earth-llm">
      <div className="ai-header">
        <div className="ai-title">
          <Brain size={24} />
          <div>
            <h3>EARTH AI URBAN PLANNER</h3>
            <p>Advanced policy recommendation system powered by real-time data</p>
          </div>
        </div>
        <div className="ai-status">
          <div className="status-dot active"></div>
          <span>AI ONLINE</span>
        </div>
      </div>

      <div className="quick-actions">
        <h4>Quick Analysis</h4>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className="action-btn" onClick={() => setInput(`Analyze ${action.label.toLowerCase()}`)}>
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="recommendations-panel">
        <h4>Active Recommendations</h4>
        <div className="recommendations-list">
          {recommendations.map(rec => (
            <div key={rec.id} className={`recommendation-card ${rec.priority}`}>
              <div className="rec-header">
                <span className="rec-title">{rec.title}</span>
                <span className={`priority-badge ${rec.priority}`}>{rec.priority.toUpperCase()}</span>
              </div>
              <div className="rec-impact">{rec.impact}</div>
              <div className="rec-location">📍 {rec.location}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === 'assistant' && <Brain size={16} className="ai-icon" />}
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant">
              <Brain size={16} className="ai-icon" />
              <div className="message-content typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about urban planning strategies..."
            className="chat-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="send-btn">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarthLLM;