import React from 'react';
import useChartData from './useChartData';
import { Line } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
import '../CSS/ProductionDataChart.css';
Chart.register(...registerables);

const ProductionDataChart = () => {
  const chartData = useChartData();

  if (!chartData) {
    return <div>Loading...</div>; 
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          color: 'azure'
        },
        ticks: {
          color: 'azure'
        }
      },
      y: {
        grid: {
          display: false,
          color: 'azure'
        },
        ticks: {
          color: 'azure'
        },
        min: -100,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'nearest',
        borderWidth: 5,
        padding: 20,
      },
      legend: {
        labels: {
          color: 'azure'
        }
      }
    }
  };

  return (
    <div className="production-chart-container">
      <div className="production-chart">
        <h2 className='text-color'>Production Data Chart</h2>
        <Line className='production-graph' data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductionDataChart;
