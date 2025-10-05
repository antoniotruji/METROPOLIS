import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, ZoomIn, ZoomOut } from 'lucide-react';
import './MapViewer.css';

const MapViewer = ({ selectedLayer = 'temperature' }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([40.4168, -3.7038], 11); // Madrid coordinates
      
      // Add base layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
    }

    // Update overlay based on selected layer
    if (layerRef.current) {
      mapInstanceRef.current.removeLayer(layerRef.current);
    }

    // Add colored overlay based on layer type
    const overlayColor = getLayerColor(selectedLayer);
    layerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.3,
      className: `layer-${selectedLayer}`
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedLayer]);

  const getLayerColor = (layer) => {
    const colors = {
      temperature: '#ff6b6b',
      vegetation: '#51cf66',
      water: '#339af0',
      pollution: '#f59f00'
    };
    return colors[layer] || '#868e96';
  };

  return (
    <div className="map-viewer">
      <div ref={mapRef} className="map-container" />
      <div className="map-controls">
        <button className="map-control-btn" title="Layers">
          <Layers size={20} />
        </button>
      </div>
      <div className="map-legend">
        <div className="legend-title">Current Layer: {selectedLayer}</div>
        <div className="legend-gradient" style={{ background: `linear-gradient(to right, ${getLayerColor(selectedLayer)}33, ${getLayerColor(selectedLayer)})` }} />
        <div className="legend-labels">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
