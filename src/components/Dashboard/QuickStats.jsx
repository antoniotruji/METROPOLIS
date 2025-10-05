import React from 'react';
import Card from '../shared/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './QuickStats.css';

const QuickStats = () => {
  const stats = [
    {
      label: 'Air Quality Index',
      value: '42',
      unit: 'AQI',
      trend: 'down',
      change: '-8%',
      status: 'good'
    },
    {
      label: 'Avg Temperature',
      value: '24.5',
      unit: '°C',
      trend: 'up',
      change: '+2.1°C',
      status: 'warning'
    },
    {
      label: 'Green Coverage',
      value: '32',
      unit: '%',
      trend: 'up',
      change: '+5%',
      status: 'good'
    },
    {
      label: 'Traffic Flow',
      value: '68',
      unit: '%',
      trend: 'neutral',
      change: '0%',
      status: 'normal'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} />;
      case 'down':
        return <TrendingDown size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  return (
    <div className="quick-stats">
      <h3 className="stats-title">Key Metrics</h3>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.status}`}>
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <span className={`stat-trend trend-${stat.trend}`}>
                {getTrendIcon(stat.trend)}
              </span>
            </div>
            <div className="stat-value">
              {stat.value}
              <span className="stat-unit">{stat.unit}</span>
            </div>
            <div className="stat-change">{stat.change} vs last week</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
