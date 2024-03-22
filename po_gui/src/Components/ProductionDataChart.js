import React from 'react';
import useChartData from './useChartData';
import { Line } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
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
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 0
        }
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 0
        },
        min: -100,
        max: 100
      }
    }
  };

  return (
    <div>
      <h2>Production Data Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProductionDataChart;
