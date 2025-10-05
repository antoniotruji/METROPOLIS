import React from 'react';
import MapViewer from '../components/Dashboard/MapViewer';
import EnvironmentalMetrics from '../components/Dashboard/EnvironmentalMetrics';
import QuickStats from '../components/Dashboard/QuickStats';
import './Dashboard.css';

const Dashboard = ({ selectedLayer, setSelectedLayer }) => {
  return (
    <div className="page-layout">
      <div className="map-section">
        <MapViewer selectedLayer={selectedLayer} />
      </div>
      <div className="side-panel">
        <div className="panel-header">
          <h2>Dashboard Overview</h2>
          <p className="panel-subtitle">Real-time environmental monitoring</p>
        </div>
        <div className="panel-content">
          <QuickStats />
          <EnvironmentalMetrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
