import React from 'react';
import { Earth, Zap, Satellite, Activity } from 'lucide-react';
import './SpaceHeader.css';

const SpaceHeader = ({ activeView, setActiveView }) => {
  return (
    <header className="space-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Satellite className="rotating-satellite" size={32} />
          </div>
          <div className="logo-text">
            <h1 className="glow-text">DUAL WORLD DIGITAL TWINS</h1>
            <span className="subtitle">NASA Hackathon 2024 • Earth & Mars Colony Management</span>
          </div>
        </div>
        
        <nav className="view-selector">
          <button 
            className={`view-btn earth-btn ${activeView === 'earth' ? 'active' : ''}`}
            onClick={() => setActiveView('earth')}
          >
            <Earth size={20} />
            <span>EARTH TWIN</span>
          </button>
          
          <button 
            className={`view-btn dual-btn ${activeView === 'dual' ? 'active' : ''}`}
            onClick={() => setActiveView('dual')}
          >
            <Activity size={20} />
            <span>DUAL VIEW</span>
          </button>
          
          <button 
            className={`view-btn mars-btn ${activeView === 'mars' ? 'active' : ''}`}
            onClick={() => setActiveView('mars')}
          >
            <div className="mars-icon">♂</div>
            <span>MARS TWIN</span>
          </button>
        </nav>
        
        <div className="status-indicators">
          <div className="status-item">
            <Zap size={16} />
            <span>SYSTEMS ONLINE</span>
          </div>
          <div className="connection-status">
            <div className="status-dot"></div>
            <span>CONNECTED</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SpaceHeader;