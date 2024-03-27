import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';
import { parseSaveTime, formatSaveTime } from './timeUtils';

const useChartData = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/production-data/');
        const productionData = response.data.map(data => ({
          ...data,
          SaveTime: formatSaveTime(parseSaveTime(data.SaveTime))
        }));

        const reversedData = productionData.reverse();

        const groupedData = reversedData.reduce((acc, cur) => {
          if (!acc[cur.LineCode]) {
            acc[cur.LineCode] = {
              labels: [],
              GAPData: [],
            };
          }
          acc[cur.LineCode].labels.push(cur.SaveTime);
          acc[cur.LineCode].GAPData.push(cur.GAP);
          return acc;
        }, {});

        const colors = [];
        const datasets = Object.keys(groupedData).map((lineCode, index) => {
          const color = getColors();
          colors.push(color);
          return {
            label: lineCode,
            data: groupedData[lineCode].GAPData,
            borderColor: color,
            backgroundColor: color,
            
            fill: origin,
            pointRadius: 0,
            pointHoverRadius: 12
          };
        });

        const newChartData = {
          labels: groupedData[Object.keys(groupedData)[0]].labels, 
          datasets: datasets
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching production data:', error);
      }
    };

    fetchData();
  }, []);

  return chartData;
};

export default useChartData;
