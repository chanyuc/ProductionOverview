import React from 'react';
import useChartData from './useChartData';
import { Line } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
import '../CSS/ProductionDataChart.css';
import { options } from './chartOptions';
Chart.register(...registerables);

// (CY): Container for loading the Line Graph for the GAP data
const ProductionDataChart = () => {
  const chartData = useChartData();
  if (!chartData) { return <div>Loading...</div>; }

  return (
    <div className="production-chart-container">
      <div className="production-chart">
        <h2 className='text-color'>Production GAP Data</h2>
        <Line className='production-graph' data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductionDataChart;
