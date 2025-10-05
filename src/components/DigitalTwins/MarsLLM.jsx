import React, { useState } from 'react';
import './MarsLLM.css';

const MarsLLM = () => {
  const [input, setInput] = useState('');
  
  const marsRecommendations = [
    {
      title: 'Greenhouse Optimization',
      impact: 'Food Production +45%',
      priority: 'high'
    },
    {
      title: 'Habitat Expansion Route',
      impact: 'Living Space +30%',
      priority: 'medium'
    },
    {
      title: 'Resource Mining Site',
      impact: 'Water Access +200%',
      priority: 'high'
    }
  ];

  return (
    <div className="mars-llm">
      <div className="ai-header mars-ai">
        <h3>🤖 MARS AI COLONY PLANNER</h3>
        <p>Optimizing colony development with rover data and orbital surveillance</p>
      </div>
      
      <div className="mars-recommendations">
        <h4>Colony Optimization Strategies</h4>
        {marsRecommendations.map((rec, index) => (
          <div key={index} className={`mars-rec-card ${rec.priority}`}>
            <div className="rec-title">{rec.title}</div>
            <div className="rec-impact">{rec.impact}</div>
            <span className={`priority-badge ${rec.priority}`}>{rec.priority}</span>
          </div>
        ))}
      </div>

      <div className="mars-chat">
        <div className="chat-message">
          <strong>Mars AI:</strong> Current atmospheric conditions optimal for greenhouse expansion. 
          Recommend establishing new agricultural modules in sector 7-Alpha. 
          Estimated resource requirement: 2,400 units water, 800 units rare earth minerals.
        </div>
        
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Mars colony optimization..."
            className="mars-chat-input"
          />
          <button className="mars-send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MarsLLM;