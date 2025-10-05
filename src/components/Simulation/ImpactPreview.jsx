import React from 'react';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../shared/Card';
import './ImpactPreview.css';

const ImpactPreview = ({ scenario }) => {
  const impacts = [
    {
      metric: 'Air Quality Index',
      before: 68,
      after: 52,
      unit: 'AQI',
      improvement: true
    },
    {
      metric: 'Average Temperature',
      before: 26.8,
      after: 24.5,
      unit: '°C',
      improvement: true
    },
    {
      metric: 'Traffic Congestion',
      before: 75,
      after: 58,
      unit: '%',
      improvement: true
    },
    {
      metric: 'Green Coverage',
      before: 28,
      after: 43,
      unit: '%',
      improvement: true
    }
  ];

  return (
    <Card title="Impact Preview" subtitle="Before vs After Comparison">
      <div className="impact-preview">
        <div className="comparison-grid">
          {impacts.map((impact, index) => (
            <div key={index} className="impact-comparison">
              <div className="impact-metric-name">{impact.metric}</div>
              <div className="comparison-values">
                <div className="value-column">
                  <div className="value-label">Before</div>
                  <div className="value-number">
                    {impact.before}
                    <span className="value-unit">{impact.unit}</span>
                  </div>
                </div>
                <div className="arrow-indicator">
                  {impact.improvement ? (
                    <TrendingDown className="trend-icon positive" size={20} />
                  ) : (
                    <TrendingUp className="trend-icon negative" size={20} />
                  )}
                </div>
                <div className="value-column">
                  <div className="value-label">After</div>
                  <div className="value-number highlight">
                    {impact.after}
                    <span className="value-unit">{impact.unit}</span>
                  </div>
                </div>
              </div>
              <div className={`impact-change ${impact.improvement ? 'positive' : 'negative'}`}>
                {Math.abs(((impact.after - impact.before) / impact.before * 100).toFixed(1))}% 
                {impact.improvement ? ' improvement' : ' increase'}
              </div>
            </div>
          ))}
        </div>

        <div className="risk-assessment">
          <div className="risk-header">
            <AlertTriangle size={20} className="risk-icon" />
            <span className="risk-title">Risk Assessment</span>
          </div>
          <div className="risk-items">
            <div className="risk-item low">
              <span className="risk-label">Implementation Complexity:</span>
              <span className="risk-badge">Low</span>
            </div>
            <div className="risk-item medium">
              <span className="risk-label">Community Impact:</span>
              <span className="risk-badge">Medium</span>
            </div>
            <div className="risk-item low">
              <span className="risk-label">Regulatory Compliance:</span>
              <span className="risk-badge">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImpactPreview;
