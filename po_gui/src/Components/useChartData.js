import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';
import { formatDate, parseSaveTime, formatSaveTime } from './timeUtils';

// (CY): Production GAP chart, every 5 min
const useChartData = (pageNumber) => {
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/prod/production-data/pagination?page=${pageNumber}&pageSize=1001`);
      const { data, totalItems } = response.data;
      
      const productionData = data.map(data => ({
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

      let colorIndex = 0;
      const datasets = Object.keys(groupedData)
        .sort()
        .map((lineCode, index) => {
        const color = getColors(colorIndex);
        colorIndex = (colorIndex + 1) % 10;
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

      setStartDate(formatDate(data[data.length - 1].SaveTime));
      setEndDate(formatDate(data[0].SaveTime));
      setChartData(newChartData);
    } catch (error) {
      console.error('Error fetching production data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return { chartData, startDate, endDate };
};

export default useChartData;
