import React, { useState } from 'react';
import MapViewer from '../components/Dashboard/MapViewer';
import FeedbackForm from '../components/Engagement/FeedbackForm';
import VotingSystem from '../components/Engagement/VotingSystem';
import './Engagement.css';

const Engagement = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'New Central Park in District 5',
      description: 'Create a 10-hectare green space with walking trails and playgrounds',
      votes: 1247,
      userVoted: false,
      status: 'active'
    },
    {
      id: 2,
      title: 'Bike Lane Network Expansion',
      description: 'Add 15km of protected bike lanes across main corridors',
      votes: 892,
      userVoted: false,
      status: 'active'
    },
    {
      id: 3,
      title: 'Smart Traffic System Installation',
      description: 'AI-powered traffic lights to reduce congestion',
      votes: 1456,
      userVoted: true,
      status: 'approved'
    }
  ]);

  const handleVote = (id) => {
    setProposals(proposals.map(p => 
      p.id === id ? { ...p, votes: p.userVoted ? p.votes - 1 : p.votes + 1, userVoted: !p.userVoted } : p
    ));
  };

  return (
    <div className="page-layout">
      <div className="map-section">
        <MapViewer selectedLayer="vegetation" />
      </div>
      <div className="side-panel">
        <div className="panel-header">
          <h2>Community Engagement</h2>
          <p className="panel-subtitle">Participate in urban planning decisions</p>
        </div>
        <div className="panel-content">
          <VotingSystem proposals={proposals} onVote={handleVote} />
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default Engagement;
