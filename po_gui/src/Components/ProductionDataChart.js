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

  return (
    <div>
      <h2>Production Data Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ProductionDataChart;
