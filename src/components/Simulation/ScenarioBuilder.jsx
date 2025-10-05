import React, { useState } from 'react';
import { Plus, Building2, Trees, Hospital, School } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import './ScenarioBuilder.css';

const ScenarioBuilder = ({ activeScenario, onScenarioChange }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [parameters, setParameters] = useState({
    greenZoneExpansion: 15,
    trafficRegulation: 30,
    buildingHeight: 10
  });

  const infrastructureTypes = [
    { id: 'park', name: 'Green Zone', icon: <Trees size={20} />, color: '#51cf66' },
    { id: 'hospital', name: 'Hospital', icon: <Hospital size={20} />, color: '#339af0' },
    { id: 'school', name: 'School', icon: <School size={20} />, color: '#f59f00' },
    { id: 'building', name: 'Building', icon: <Building2 size={20} />, color: '#845ef7' }
  ];

  const handleParameterChange = (param, value) => {
    const updated = { ...parameters, [param]: value };
    setParameters(updated);
    onScenarioChange({
      type: selectedType,
      parameters: updated
    });
  };

  return (
    <Card title="Build Scenario" icon={<Plus size={20} />}>
      <div className="scenario-builder">
        <div className="infrastructure-selector">
          <label className="selector-label">Select Infrastructure Type:</label>
          <div className="infrastructure-grid">
            {infrastructureTypes.map(type => (
              <div
                key={type.id}
                className={`infrastructure-card ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => setSelectedType(type.id)}
                style={{ borderColor: selectedType === type.id ? type.color : 'transparent' }}
              >
                <div className="infrastructure-icon" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <div className="infrastructure-name">{type.name}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedType && (
          <div className="parameters-section">
            <label className="selector-label">Adjust Parameters:</label>
            
            <div className="parameter-control">
              <div className="parameter-header">
                <span>Green Zone Expansion</span>
                <span className="parameter-value">{parameters.greenZoneExpansion}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={parameters.greenZoneExpansion}
                onChange={(e) => handleParameterChange('greenZoneExpansion', e.target.value)}
                className="parameter-slider"
              />
            </div>

            <div className="parameter-control">
              <div className="parameter-header">
                <span>Traffic Regulation Level</span>
                <span className="parameter-value">{parameters.trafficRegulation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={parameters.trafficRegulation}
                onChange={(e) => handleParameterChange('trafficRegulation', e.target.value)}
                className="parameter-slider"
              />
            </div>

            <div className="parameter-control">
              <div className="parameter-header">
                <span>Building Height Limit</span>
                <span className="parameter-value">{parameters.buildingHeight} floors</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={parameters.buildingHeight}
                onChange={(e) => handleParameterChange('buildingHeight', e.target.value)}
                className="parameter-slider"
              />
            </div>

            <Button variant="primary" fullWidth>
              Run Simulation
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ScenarioBuilder;
