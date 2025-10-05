import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '../shared/Card';
import { Calendar } from 'lucide-react';
import './TimeSeriesChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TimeSeriesChart = ({ layer, timeRange, onTimeRangeChange }) => {
  // Generate mock data
  const generateData = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const dataPoints = labels.map(() => Math.floor(Math.random() * 40) + 10);
    
    return {
      labels,
      datasets: [
        {
          label: `${layer} levels`,
          data: dataPoints,
          borderColor: 'rgb(0, 102, 204)',
          backgroundColor: 'rgba(0, 102, 204, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const timeRanges = ['week', 'month', 'year'];

  return (
    <Card 
      title="Historical Trends" 
      icon={<Calendar size={20} />}
      actions={
        <div className="time-range-selector">
          {timeRanges.map(range => (
            <button
              key={range}
              className={`time-range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => onTimeRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      }
    >
      <div className="chart-container">
        <Line data={generateData()} options={options} />
      </div>
    </Card>
  );
};

export default TimeSeriesChart;
