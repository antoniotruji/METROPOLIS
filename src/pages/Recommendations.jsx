import React, { useState } from 'react';
import MapViewer from '../components/Dashboard/MapViewer';
import ChatInterface from '../components/LLMAssistant/ChatInterface';
import RecommendationCard from '../components/LLMAssistant/RecommendationCard';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: 'Increase Green Zone Coverage in District 5',
      priority: 'high',
      impact: {
        co2Reduction: '15%',
        temperatureReduction: '-2.3°C',
        costEstimate: '€450,000',
        populationAffected: '45,000'
      },
      compliance: true,
      reasoning: 'Analysis shows District 5 has 18% lower green coverage compared to city average, correlating with 2.8°C higher temperatures and 23% worse air quality.',
      actions: [
        'Create 3 new urban parks (total 12 hectares)',
        'Plant 500 street trees along main avenues',
        'Convert 2 unused parking lots to green spaces'
      ]
    },
    {
      id: 2,
      title: 'Optimize Traffic Flow in Central Business District',
      priority: 'medium',
      impact: {
        co2Reduction: '8%',
        trafficReduction: '25%',
        costEstimate: '€180,000',
        populationAffected: '120,000'
      },
      compliance: true,
      reasoning: 'ML models predict that implementing smart traffic signals and dedicated bus lanes will reduce congestion by 25%, lowering emissions and improving air quality.',
      actions: [
        'Install AI-powered traffic management system',
        'Create 2 dedicated bus lanes on main corridors',
        'Implement congestion pricing during peak hours'
      ]
    }
  ]);

  return (
    <div className="page-layout">
      <div className="map-section">
        <MapViewer selectedLayer="pollution" />
      </div>
      <div className="side-panel">
        <div className="panel-header">
          <h2>AI Urban Planner</h2>
          <p className="panel-subtitle">Get data-driven recommendations for sustainable urban development</p>
        </div>
        <div className="recommendations-content">
          <ChatInterface onNewRecommendation={(rec) => setRecommendations([...recommendations, rec])} />
          
          <div className="recommendations-list">
            <h3 className="section-title">Current Recommendations</h3>
            {recommendations.map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
