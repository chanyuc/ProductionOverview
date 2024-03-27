import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';
import { parseSaveTime, formatSaveTime } from './timeUtils';

const useReceiveOrderCount = () => {
  const [chartData, setChartData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersByHour = {};
        const response = await axios.get('http://localhost:3001/api/order/receive-data/');
        const carOrders = response.data.map(order => ({
          ...order,
          CarDate: formatSaveTime(parseSaveTime(order.CarDate))
        }));

        carOrders.forEach(order => {
          const parsedDate = order.CarDate;
          const [hour] = parsedDate.split(':').map(Number);
          const key = `${hour}:00`;

          if (!ordersByHour[key]) {
            ordersByHour[key] = 1;
          } else {
            ordersByHour[key]++;
          }
        });

        const sortedKeys = Object.keys(ordersByHour)
        .sort((a, b) => {
          const [hourA] = a.split(':').map(Number);
          const [hourB] = b.split(':').map(Number);
          return hourA - hourB;
        });

        const labels = sortedKeys.map(key => {
          const [hour] = key.split(':').map(Number);
          return `${hour}:00`;
        });

        const data = sortedKeys.map(key => ordersByHour[key]);
        const color = getColors();

        const newChartData = {
          labels: labels,
          datasets: [{
            label: '# of Orders',
            data: data,
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

    fetchData();
  }, []);

  return chartData;
};

export default useReceiveOrderCount;
