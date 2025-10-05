import React from 'react';
import { MapPin, Camera, Satellite, Zap, Trees, Building, Car, Recycle } from 'lucide-react';
import './EarthMonitoring.css';

const EarthMonitoring = ({ data }) => {
  const sensorData = [
    { id: 1, type: 'Air Quality', location: 'Downtown', value: '42 AQI', status: 'good', icon: '💨' },
    { id: 2, type: 'Traffic Flow', location: 'Highway A1', value: '68%', status: 'moderate', icon: '🚗' },
    { id: 3, type: 'Energy Grid', location: 'Grid Station 3', value: '89%', status: 'good', icon: '⚡' },
    { id: 4, type: 'Water Quality', location: 'River North', value: '7.2 pH', status: 'good', icon: '💧' },
    { id: 5, type: 'Noise Level', location: 'City Center', value: '52 dB', status: 'moderate', icon: '🔊' },
    { id: 6, type: 'Green Index', location: 'Park District', value: '78%', status: 'excellent', icon: '🌳' }
  ];

  const satelliteFeeds = [
    { name: 'Landsat 8', status: 'active', coverage: 'Full City', lastUpdate: '2 min ago' },
    { name: 'Sentinel-2', status: 'active', coverage: 'Environmental', lastUpdate: '5 min ago' },
    { name: 'MODIS Terra', status: 'active', coverage: 'Temperature', lastUpdate: '1 min ago' }
  ];

  return (
    <div className="earth-monitoring">
      <div className="monitoring-grid">
        <div className="sensor-panel">
          <h3 className="panel-title">
            <Camera size={18} />
            Live Sensor Network
          </h3>
          <div className="sensor-list">
            {sensorData.map(sensor => (
              <div key={sensor.id} className={`sensor-item ${sensor.status}`}>
                <div className="sensor-icon">{sensor.icon}</div>
                <div className="sensor-info">
                  <div className="sensor-type">{sensor.type}</div>
                  <div className="sensor-location">📍 {sensor.location}</div>
                </div>
                <div className="sensor-value">{sensor.value}</div>
                <div className={`status-indicator ${sensor.status}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="satellite-panel">
          <h3 className="panel-title">
            <Satellite size={18} />
            Satellite Data Feeds
          </h3>
          <div className="satellite-list">
            {satelliteFeeds.map((sat, index) => (
              <div key={index} className="satellite-item">
                <div className="sat-header">
                  <span className="sat-name">{sat.name}</span>
                  <div className="sat-status active">
                    <div className="status-dot"></div>
                    ONLINE
                  </div>
                </div>
                <div className="sat-details">
                  <span>Coverage: {sat.coverage}</span>
                  <span>Updated: {sat.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-panel">
          <h3 className="panel-title">
            <MapPin size={18} />
            City Overview Map
          </h3>
          <div className="city-map">
            <div className="map-placeholder">
              <div className="map-grid">
                <div className="zone green-zone">🌳 Parks</div>
                <div className="zone residential">🏠 Residential</div>
                <div className="zone commercial">🏢 Commercial</div>
                <div className="zone industrial">🏭 Industrial</div>
              </div>
              <div className="map-overlay">
                <div className="hotspot pollution">🔴 Pollution Alert</div>
                <div className="hotspot traffic">🟡 Traffic Congestion</div>
                <div className="hotspot green">🟢 Optimal Zone</div>
              </div>
            </div>
          </div>
        </div>

        <div className="infrastructure-panel">
          <h3 className="panel-title">
            <Building size={18} />
            Infrastructure Status
          </h3>
          <div className="infrastructure-grid">
            <div className="infra-item">
              <Trees size={24} />
              <span>Green Zones</span>
              <div className="infra-status good">Optimal</div>
            </div>
            <div className="infra-item">
              <Building size={24} />
              <span>Buildings</span>
              <div className="infra-status good">Stable</div>
            </div>
            <div className="infra-item">
              <Car size={24} />
              <span>Transport</span>
              <div className="infra-status moderate">Congested</div>
            </div>
            <div className="infra-item">
              <Recycle size={24} />
              <span>Waste Mgmt</span>
              <div className="infra-status good">Efficient</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthMonitoring;