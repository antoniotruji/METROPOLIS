import React, { useState } from 'react';
import { AlertCircle, CheckCircle, TrendingDown, DollarSign, Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../shared/Button';
import './RecommendationCard.css';

const RecommendationCard = ({ recommendation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    high: 'var(--error)',
    medium: 'var(--warning)',
    low: 'var(--info)'
  };

  return (
    <div className={`recommendation-card priority-${recommendation.priority}`}>
      <div className="recommendation-header">
        <div className="recommendation-title-row">
          <h4 className="recommendation-title">{recommendation.title}</h4>
          <span 
            className={`priority-badge priority-${recommendation.priority}`}
            style={{ background: priorityColors[recommendation.priority] }}
          >
            {recommendation.priority}
          </span>
        </div>
        {recommendation.compliance && (
          <div className="compliance-badge">
            <CheckCircle size={16} />
            <span>Complies with regulations</span>
          </div>
        )}
      </div>

      <div className="impact-metrics">
        <div className="impact-item">
          <TrendingDown size={18} className="impact-icon" />
          <div>
            <div className="impact-label">CO₂ Reduction</div>
            <div className="impact-value">{recommendation.impact.co2Reduction}</div>
          </div>
        </div>
        <div className="impact-item">
          <DollarSign size={18} className="impact-icon" />
          <div>
            <div className="impact-label">Cost Estimate</div>
            <div className="impact-value">{recommendation.impact.costEstimate}</div>
          </div>
        </div>
        <div className="impact-item">
          <Users size={18} className="impact-icon" />
          <div>
            <div className="impact-label">Population</div>
            <div className="impact-value">{recommendation.impact.populationAffected}</div>
          </div>
        </div>
        {recommendation.impact.temperatureReduction && (
          <div className="impact-item">
            <AlertCircle size={18} className="impact-icon" />
            <div>
              <div className="impact-label">Temperature</div>
              <div className="impact-value">{recommendation.impact.temperatureReduction}</div>
            </div>
          </div>
        )}
      </div>

      <div className="recommendation-reasoning">
        <strong>AI Reasoning:</strong> {recommendation.reasoning}
      </div>

      {isExpanded && (
        <div className="recommendation-actions">
          <h5 className="actions-title">Recommended Actions:</h5>
          <ul className="actions-list">
            {recommendation.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="recommendation-footer">
        <Button
          variant="outline"
          size="small"
          icon={isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'View Details'}
        </Button>
        <Button
          variant="primary"
          size="small"
          icon={<MapPin size={16} />}
        >
          Apply to Map
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
