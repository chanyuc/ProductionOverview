import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';

// (CY): Receive Count order, API already has counted it per hour
const useReceiveOrderCount = () => {
  const [chartData1, setChartData1] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/order/receive-data/average');
      const data = response.data;
      const reversedData = data.reverse();

      const labels = reversedData.map(entry => {
        const hour = entry.DateTime.split(' ')[1];
        return `${hour}`; 
      });
      const orderCounts = reversedData.map(entry => entry.OrderCount);
      const color = getColors(8);

      const newChartData = {
        labels: labels,
        datasets: [{
          label: '# of Orders',
          data: orderCounts,
          borderColor: color,
          backgroundColor: color,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 8
        }]
      };

      setChartData1(newChartData);
    } catch (error) {
      console.error('Error fetching car orders data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return chartData1;
};

export default useReceiveOrderCount;