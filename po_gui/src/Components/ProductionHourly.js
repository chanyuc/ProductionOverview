import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';
import { formatDate2 } from './timeUtils';

// (CY): Production GAP chart, but averaged out by hourly
const ProductionHourly = () => {
  const [chartData2, setChartData2] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/prod/production-data/average');
      const data = response.data;
  
      const productionData = data.map(item => ({
        ...item,
        DateTime: item.DateTime
      }));
  
      const groupedData = productionData.reduce((acc, cur) => {
        const dateTimeParts = cur.DateTime.split(' ');
        const date = dateTimeParts[0];
        const hour = dateTimeParts[1].split(':')[0];
        const lineCode = cur.LineCode;
  
        if (!acc[lineCode]) {
          acc[lineCode] = {};
        }
        if (!acc[lineCode][hour]) {
          acc[lineCode][hour] = {
            labels: [],
            dataPoints: [],
            date: date
          };
        }
        acc[lineCode][hour].labels.push(cur.DateTime);
        acc[lineCode][hour].dataPoints.push(cur.AverageGAP);
        return acc;
      }, {});
  
      console.log('Data Points:', groupedData);
      const allHours = Object.keys(groupedData[Object.keys(groupedData)[0]]);
      const sortedHours = allHours.sort((a, b) => {
        const dateA = groupedData[Object.keys(groupedData)[0]][a].date;
        const dateB = groupedData[Object.keys(groupedData)[0]][b].date;
        const hourA = parseInt(a);
        const hourB = parseInt(b);
  
        if (dateA !== dateB) {
          return dateA.localeCompare(dateB);
        } else {
          return hourA - hourB;
        }
      });
      const labels = sortedHours.map(hour => `${hour}:00`);

      let colorIndex = 0;
      const datasets = Object.keys(groupedData)
        .sort()
        .map(lineCode => {
          const color = getColors(colorIndex);
          colorIndex = (colorIndex + 1) % 10;
          return {
            label: lineCode,
            data: sortedHours.map(hour => groupedData[lineCode][hour].dataPoints[0]),
            borderColor: color,
            backgroundColor: color,
            pointRadius: 0,
            pointHoverRadius: 8
          };
        });
  
      const newChartData = {
        labels: labels,
        datasets: datasets
      };
  
      setStartDate(formatDate2(data[data.length - 1].DateTime));
      setEndDate(formatDate2(data[0].DateTime));
      setChartData2(newChartData);
    } catch (error) {
      console.error('Error fetching production data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { chartData2, startDate, endDate };
};

export default ProductionHourly;