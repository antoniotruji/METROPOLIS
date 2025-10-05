import React from 'react';
import { Wind, Droplets, Sun, Cloud } from 'lucide-react';
import Card from '../shared/Card';
import './EnvironmentalMetrics.css';

const EnvironmentalMetrics = () => {
  const pollutants = [
    { name: 'CO', value: 0.5, unit: 'ppm', max: 9, status: 'good' },
    { name: 'NO₂', value: 28, unit: 'μg/m³', max: 200, status: 'good' },
    { name: 'O₃', value: 65, unit: 'μg/m³', max: 180, status: 'moderate' },
    { name: 'SO₂', value: 12, unit: 'μg/m³', max: 350, status: 'good' },
    { name: 'PM2.5', value: 18, unit: 'μg/m³', max: 25, status: 'moderate' },
    { name: 'PM10', value: 32, unit: 'μg/m³', max: 50, status: 'moderate' }
  ];

  const weather = [
    { icon: <Sun size={20} />, label: 'Temperature', value: '24.5°C' },
    { icon: <Droplets size={20} />, label: 'Humidity', value: '62%' },
    { icon: <Wind size={20} />, label: 'Wind Speed', value: '12 km/h' },
    { icon: <Cloud size={20} />, label: 'Cloud Cover', value: '45%' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'var(--success)';
      case 'moderate': return 'var(--warning)';
      case 'poor': return 'var(--error)';
      default: return 'var(--gray-400)';
    }
  };

  return (
    <div className="environmental-metrics">
      <Card title="Air Quality" subtitle="Current pollutant levels">
        <div className="pollutants-grid">
          {pollutants.map((pollutant, index) => (
            <div key={index} className="pollutant-item">
              <div className="pollutant-header">
                <span className="pollutant-name">{pollutant.name}</span>
                <span className="pollutant-value">
                  {pollutant.value} <span className="pollutant-unit">{pollutant.unit}</span>
                </span>
              </div>
              <div className="pollutant-bar">
                <div 
                  className="pollutant-fill" 
                  style={{ 
                    width: `${(pollutant.value / pollutant.max) * 100}%`,
                    background: getStatusColor(pollutant.status)
                  }}
                />
              </div>
              <div className="pollutant-status" style={{ color: getStatusColor(pollutant.status) }}>
                {pollutant.status}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Weather Conditions" subtitle="Real-time meteorological data">
        <div className="weather-grid">
          {weather.map((item, index) => (
            <div key={index} className="weather-item">
              <div className="weather-icon">{item.icon}</div>
              <div className="weather-info">
                <div className="weather-label">{item.label}</div>
                <div className="weather-value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EnvironmentalMetrics;
