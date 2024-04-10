import { Line } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
import '../CSS/ProductionDataChart.css';
import { options } from './chartOptions';
import useChartData from './useChartData';
import useReceiveOrderCount from './ReceiveOrderCount';
import getColors from './colorUtils';

Chart.register(...registerables);

const ReceiveOrderChart = ({ pageNumber }) => {
  const productionData = useChartData(pageNumber);
  const orderCountData = useReceiveOrderCount(pageNumber);

  if (!productionData || !orderCountData || !productionData.chartData) {
    return <div>Loading...</div>;
  }

  const { chartData: productionChartData, startDate, endDate } = productionData;
  const chartData1 = orderCountData;

  if (!chartData1) {
    return <div>Loading...</div>;
  }

  const productionDatasets = [
    { label: 'BPF', index: 0 },
    { label: 'BPR', index: 1 },
    { label: 'CPM', index: 2 },
    { label: 'ENG', index: 3 },
    { label: 'FCM', index: 4 },
    { label: 'FEM', index: 5 },
    { label: 'RCM', index: 6 }
  ];

  const alignedData = productionChartData.labels.map(hour => {
    const orderCountIndex = chartData1.labels.indexOf(hour);
    const orderCountValue = orderCountIndex !== -1 ? chartData1.datasets[0].data[orderCountIndex] : null;
    const productionValues = productionDatasets.map(dataset => ({
      hour: hour,
      value: productionChartData.datasets[dataset.index].data[productionChartData.labels.indexOf(hour)],
      label: dataset.label
    }));
    return { hour: hour, orderCountValue: orderCountValue, productionValues: productionValues };
  });

  const datasets = [
    {
      label: '# of Orders',
      data: alignedData.map(data => data.orderCountValue),
      borderColor: 'red',
      backgroundColor: 'red',
      spanGaps: true,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 50
    },
    ...productionDatasets.map((dataset, index) => ({
      label: dataset.label,
      data: alignedData.map(data => data.productionValues[index].value),
      borderColor: getColors(index),
      backgroundColor: getColors(index),
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 8
    }))
  ];

  const multiLineData = {
    labels: productionChartData.labels,
    datasets: datasets
  };

  return (
    <div className="production-chart-container">
      <div className="production-chart">
        <h2 className='text-color'>Receive Order Count</h2>
        <div className="date-range">
          <p className='p-text'>Date: {startDate} - {endDate}</p>
        </div>
        <Line className='production-graph' data={multiLineData} options={options} />
      </div>
    </div>
  );
};

export default ReceiveOrderChart;
