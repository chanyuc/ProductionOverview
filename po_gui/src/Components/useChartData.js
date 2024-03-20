import { useState, useEffect } from 'react';
import axios from 'axios';

const useChartData = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/production-data/recent');
        const productionData = response.data;

        productionData.sort((a, b) => a.LineCode.localeCompare(b.LineCode));

        const labels = productionData.map(data => data.SaveTime);
        const GAPData = productionData.map(data => data.GAP);
        const PENDData = productionData.map(data => data.PEND);
        const MKCNTData = productionData.map(data => data.MKCNT);

        const newChartData = {
          labels: labels,
          datasets: [
            {
              label: 'GAP',
              data: GAPData,
              borderColor: 'red',
              fill: false
            },
            {
              label: 'PEND',
              data: PENDData,
              borderColor: 'blue',
              fill: false
            },
            {
              label: 'MKCNT',
              data: MKCNTData,
              borderColor: 'green',
              fill: false
            }
          ]
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
