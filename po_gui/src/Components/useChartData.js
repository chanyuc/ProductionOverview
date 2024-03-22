import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let colorIndex = 0;

const getColors = () => {
  const pastelColors = [
    '#FF9999', // Light red
    '#99CCFF', // Light blue
    '#99FF99', // Light green
    '#FFCC99', // Light orange
    '#FF99FF', // Light purple
    '#FFFF99', // Light yellow
    '#FFCCCC', // Light pink
    '#CC99FF', // Light lavender
    '#99FFFF', // Light cyan
    '#FFD699', // Light peach
  ];

  const color = pastelColors[colorIndex];
  colorIndex = (colorIndex + 1) % pastelColors.length;
  return color;
};

const parseSaveTime = (saveTime) => {
  const year = saveTime.substring(0, 4);
  const month = saveTime.substring(4, 6);
  const day = saveTime.substring(6, 8);
  const hour = saveTime.substring(8, 10);
  const minute = saveTime.substring(10, 12);
  const second = saveTime.substring(12, 14);

  const parsedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  return parsedDate;
};

const formatSaveTime = (saveTime) => {
  const hours = saveTime.getHours().toString().padStart(2, '0');
  const minutes = saveTime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

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
              PENDData: [],
              MKCNTData: []
            };
          }
          acc[cur.LineCode].labels.push(cur.SaveTime);
          acc[cur.LineCode].GAPData.push(cur.GAP);
          acc[cur.LineCode].PENDData.push(cur.PEND);
          acc[cur.LineCode].MKCNTData.push(cur.MKCNT);
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
            fill: false,
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
