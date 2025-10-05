import React, { useState } from 'react';
import { MapPin, Wifi, Camera, Activity, TreePine, Building2, Car, Recycle } from 'lucide-react';
import EarthLLM from './EarthLLM';
import EarthMonitoring from './EarthMonitoring';
import './EarthTwin.css';

const EarthTwin = ({ data, isActive }) => {
  const [activeTab, setActiveTab] = useState('monitoring');

  return (
    <div className={`earth-twin ${isActive ? 'active' : ''}`}>
      <div className="twin-header">
        <div className="header-title">
          <div className="planet-icon earth-planet">🌍</div>
          <div>
            <h2 className="glow-text">EARTH DIGITAL TWIN</h2>
            <p className="subtitle">Real-time Urban Management System</p>
          </div>
        </div>
        
        <div className="connection-info">
          <div className="data-source">
            <Wifi size={16} />
            <span>Satellite Feed Active</span>
          </div>
          <div className="data-source">
            <Camera size={16} />
            <span>1,247 Sensors Online</span>
          </div>
        </div>
      </div>

      <div className="twin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoring')}
        >
          <Activity size={18} />
          <span>MONITORING</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <div className="ai-icon">🧠</div>
          <span>AI URBAN PLANNER</span>
        </button>
      </div>

      <div className="twin-content">
        {activeTab === 'monitoring' ? (
          <EarthMonitoring data={data} />
        ) : (
          <EarthLLM />
        )}
      </div>

      <div className="quick-metrics">
        <div className="metric-card air-quality">
          <div className="metric-icon">💨</div>
          <div className="metric-info">
            <span className="metric-label">Air Quality</span>
            <span className="metric-value">{data.airQuality.toFixed(0)} AQI</span>
          </div>
        </div>
        
        <div className="metric-card temperature">
          <div className="metric-icon">🌡️</div>
          <div className="metric-info">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">{data.temperature.toFixed(1)}°C</span>
          </div>
        </div>
        
        <div className="metric-card population">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <span className="metric-label">Population</span>
            <span className="metric-value">{data.population}M</span>
          </div>
        </div>
        
        <div className="metric-card green">
          <div className="metric-icon">🌳</div>
          <div className="metric-info">
            <span className="metric-label">Green Areas</span>
            <span className="metric-value">{data.greenCoverage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthTwin;