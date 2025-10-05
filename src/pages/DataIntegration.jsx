import React, { useState } from 'react';
import MapViewer from '../components/Dashboard/MapViewer';
import SatelliteLayerControl from '../components/DataIntegration/SatelliteLayerControl';
import TimeSeriesChart from '../components/DataIntegration/TimeSeriesChart';
import './DataIntegration.css';

const DataIntegration = ({ selectedLayer, setSelectedLayer }) => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="page-layout">
      <div className="map-section">
        <MapViewer selectedLayer={selectedLayer} />
      </div>
      <div className="side-panel">
        <div className="panel-header">
          <h2>Data Integration</h2>
          <p className="panel-subtitle">NASA satellite data & urban analytics</p>
        </div>
        <div className="panel-content">
          <SatelliteLayerControl 
            selectedLayer={selectedLayer}
            onLayerChange={setSelectedLayer}
          />
          <TimeSeriesChart 
            layer={selectedLayer}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default DataIntegration;
