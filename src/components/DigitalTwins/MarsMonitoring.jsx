import React from 'react';
import './MarsMonitoring.css';

const MarsMonitoring = ({ data }) => {
  return (
    <div className="mars-monitoring">
      <div className="monitoring-grid">
        <div className="rover-panel">
          <h3>🤖 Active Rovers</h3>
          <div className="rover-list">
            <div className="rover-item">
              <span>Perseverance</span>
              <div className="rover-status active">ACTIVE</div>
            </div>
            <div className="rover-item">
              <span>Curiosity</span>
              <div className="rover-status active">ACTIVE</div>
            </div>
            <div className="rover-item">
              <span>Ingenuity</span>
              <div className="rover-status maintenance">MAINTENANCE</div>
            </div>
          </div>
        </div>
        
        <div className="environment-panel">
          <h3>🌡️ Environmental Data</h3>
          <div className="env-data">
            <div className="env-item">
              <span>Temperature: {data.temperature}°C</span>
            </div>
            <div className="env-item">
              <span>Pressure: {data.atmosphericPressure} kPa</span>
            </div>
            <div className="env-item">
              <span>Wind Speed: 15 km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarsMonitoring;