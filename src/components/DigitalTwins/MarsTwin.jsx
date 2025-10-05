import React, { useState } from 'react';
import { Cpu, Radio, Thermometer, Home, Wrench } from 'lucide-react';
import MarsLLM from './MarsLLM';
import MarsMonitoring from './MarsMonitoring';
import './MarsTwin.css';

const MarsTwin = ({ data, isActive }) => {
  const [activeTab, setActiveTab] = useState('monitoring');

  return (
    <div className={`mars-twin ${isActive ? 'active' : ''}`}>
      <div className="twin-header">
        <div className="header-title">
          <div className="planet-icon mars-planet">🔴</div>
          <div>
            <h2 className="glow-text">MARS DIGITAL TWIN</h2>
            <p className="subtitle">Colony Development & Management System</p>
          </div>
        </div>
        
        <div className="connection-info">
          <div className="data-source">
            <Radio size={16} />
            <span>Rover Network Active</span>
          </div>
          <div className="data-source">
            <Cpu size={16} />
            <span>{data.rovers} Rovers Deployed</span>
          </div>
        </div>
      </div>

      <div className="twin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoring')}
        >
          <Thermometer size={18} />
          <span>MONITORING</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <div className="ai-icon">🤖</div>
          <span>AI COLONY PLANNER</span>
        </button>
      </div>

      <div className="twin-content">
        {activeTab === 'monitoring' ? (
          <MarsMonitoring data={data} />
        ) : (
          <MarsLLM />
        )}
      </div>

      <div className="quick-metrics">
        <div className="metric-card temperature">
          <div className="metric-icon">❄️</div>
          <div className="metric-info">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">{data.temperature.toFixed(0)}°C</span>
          </div>
        </div>
        
        <div className="metric-card pressure">
          <div className="metric-icon">📊</div>
          <div className="metric-info">
            <span className="metric-label">Pressure</span>
            <span className="metric-value">{data.atmosphericPressure.toFixed(2)} kPa</span>
          </div>
        </div>
        
        <div className="metric-card rovers">
          <div className="metric-icon">🤖</div>
          <div className="metric-info">
            <span className="metric-label">Active Rovers</span>
            <span className="metric-value">{data.rovers}</span>
          </div>
        </div>
        
        <div className="metric-card structures">
          <div className="metric-icon">🏗️</div>
          <div className="metric-info">
            <span className="metric-label">Structures</span>
            <span className="metric-value">{data.structures}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarsTwin;