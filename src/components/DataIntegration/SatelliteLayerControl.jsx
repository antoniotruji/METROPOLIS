import React from 'react';
import { Satellite, Leaf, Droplet, Wind, Map, Activity } from 'lucide-react';
import Card from '../shared/Card';
import './SatelliteLayerControl.css';

const SatelliteLayerControl = ({ selectedLayer, onLayerChange }) => {
  const layers = [
    {
      id: 'temperature',
      name: 'Land Surface Temperature',
      icon: <Activity size={20} />,
      description: 'NASA MODIS thermal data',
      color: '#ff6b6b'
    },
    {
      id: 'vegetation',
      name: 'Vegetation Index (NDVI)',
      icon: <Leaf size={20} />,
      description: 'Landsat & Sentinel-2',
      color: '#51cf66'
    },
    {
      id: 'water',
      name: 'Water Quality',
      icon: <Droplet size={20} />,
      description: 'Aqua satellite observations',
      color: '#339af0'
    },
    {
      id: 'pollution',
      name: 'Air Quality (NO₂, CO)',
      icon: <Wind size={20} />,
      description: 'Sentinel-5P TROPOMI',
      color: '#f59f00'
    },
    {
      id: 'landuse',
      name: 'Land Use Classification',
      icon: <Map size={20} />,
      description: 'Multi-spectral analysis',
      color: '#845ef7'
    }
  ];

  return (
    <Card title="Satellite Data Layers" icon={<Satellite size={20} />}>
      <div className="layer-list">
        {layers.map(layer => (
          <div
            key={layer.id}
            className={`layer-item ${selectedLayer === layer.id ? 'active' : ''}`}
            onClick={() => onLayerChange(layer.id)}
          >
            <div 
              className="layer-color-indicator" 
              style={{ background: layer.color }}
            />
            <div className="layer-icon">{layer.icon}</div>
            <div className="layer-info">
              <div className="layer-name">{layer.name}</div>
              <div className="layer-description">{layer.description}</div>
            </div>
            {selectedLayer === layer.id && (
              <div className="layer-active-indicator">●</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SatelliteLayerControl;
