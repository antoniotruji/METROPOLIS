import React from 'react';
import { ThumbsUp, CheckCircle } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import './VotingSystem.css';

const VotingSystem = ({ proposals, onVote }) => {
  return (
    <Card title="Active Proposals" subtitle="Vote on urban development initiatives">
      <div className="voting-list">
        {proposals.map(proposal => (
          <div key={proposal.id} className={`proposal-card ${proposal.status}`}>
            <div className="proposal-header">
              <h4 className="proposal-title">{proposal.title}</h4>
              {proposal.status === 'approved' && (
                <span className="status-badge approved">
                  <CheckCircle size={14} />
                  Approved
                </span>
              )}
            </div>
            <p className="proposal-description">{proposal.description}</p>
            <div className="proposal-footer">
              <div className="vote-count">
                <ThumbsUp size={16} className="vote-icon" />
                <span>{proposal.votes} votes</span>
              </div>
              <Button
                variant={proposal.userVoted ? 'success' : 'outline'}
                size="small"
                onClick={() => onVote(proposal.id)}
                disabled={proposal.status === 'approved'}
              >
                {proposal.userVoted ? 'Voted' : 'Vote'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VotingSystem;
