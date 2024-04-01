import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';

const useReceiveOrderCount = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/order/receive-data/average');
      const data = response.data;

      const labels = data.map(entry => {
        const hour = entry.DateTime.split(' ')[1].split(':')[0];
        return `${hour}:00`; 
      });      
      const orderCounts = data.map(entry => entry.OrderCount);
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

      setChartData(newChartData);
    } catch (error) {
      console.error('Error fetching car orders data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return chartData;
};

export default useReceiveOrderCount;
