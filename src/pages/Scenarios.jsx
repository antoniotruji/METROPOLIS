import React, { useState } from 'react';
import MapViewer from '../components/Dashboard/MapViewer';
import ScenarioBuilder from '../components/Simulation/ScenarioBuilder';
import ImpactPreview from '../components/Simulation/ImpactPreview';
import './Scenarios.css';

const Scenarios = ({ activeScenario, setActiveScenario }) => {
  return (
    <div className="page-layout">
      <div className="map-section">
        <MapViewer selectedLayer="temperature" />
      </div>
      <div className="side-panel">
        <div className="panel-header">
          <h2>Scenario Simulation</h2>
          <p className="panel-subtitle">Model urban planning interventions</p>
        </div>
        <div className="panel-content">
          <ScenarioBuilder 
            activeScenario={activeScenario}
            onScenarioChange={setActiveScenario}
          />
          {activeScenario && (
            <ImpactPreview scenario={activeScenario} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
