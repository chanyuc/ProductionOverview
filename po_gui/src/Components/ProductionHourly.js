import { useState, useEffect } from 'react';
import axios from 'axios';
import getColors from './colorUtils';
import { parseSaveTime, formatSaveTime } from './timeUtils';

const ProductionHourly = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/prod/production-data/');
        const productionData = response.data.map(data => ({
          ...data,
          SaveTime: formatSaveTime(parseSaveTime(data.SaveTime))
        }));

        const groupedData = productionData.reduce((acc, cur) => {
            const hour = cur.SaveTime.split(':')[0];
            if (!acc[cur.LineCode]) {
                acc[cur.LineCode] = {};
            }
            if (!acc[cur.LineCode][hour]) {
                acc[cur.LineCode][hour] = {
                    labels: [],
                    totalGAP: 0, 
                    count: 0, 
                };
            }
            acc[cur.LineCode][hour].labels.push(cur.SaveTime);
            acc[cur.LineCode][hour].totalGAP += cur.GAP;
            acc[cur.LineCode][hour].count++;
            return acc;
        }, {});

        Object.keys(groupedData).forEach(lineCode => {
            Object.keys(groupedData[lineCode]).forEach(hour => {
                const hourData = groupedData[lineCode][hour];
                const averageGAP = hourData.totalGAP / hourData.count;
                hourData.GAPData = averageGAP;
                delete hourData.totalGAP;
                delete hourData.count;
            });
        });

        const labels = Object.keys(groupedData[Object.keys(groupedData)[0]])
            .sort()
            .map(hour => `${hour}:00`);

        let colorIndex = 0;
        const datasets = Object.keys(groupedData)
          .sort()
          .map(lineCode => {
            const color = getColors(colorIndex);
            colorIndex = (colorIndex + 1) % 10;
            return {
                label: lineCode,
                data: Object.keys(groupedData[lineCode])
                    .sort()
                    .map(hour => groupedData[lineCode][hour].GAPData),
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

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching production data:', error);
      }
    };

    fetchData();
  }, []);

  return chartData;
};

export default ProductionHourly;