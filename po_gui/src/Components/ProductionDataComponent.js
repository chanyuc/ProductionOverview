import React, { useState, useEffect } from 'react';
import axios from 'axios';

const parseSaveTime = (saveTime) => {
    const year = saveTime.substring(0, 4);
    const month = saveTime.substring(4, 6);
    const day = saveTime.substring(6, 8);
    const hour = saveTime.substring(8, 10);
    const minute = saveTime.substring(10, 12);
    const second = saveTime.substring(12, 14);

    // Create a new Date object with the extracted components
    const parsedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

    return parsedDate;
};

const ProductionDataComponent = () => {
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/production-data/recent');
        const parsedData = response.data.map(data => ({
            ...data,
            SaveTime: parseSaveTime(data.SaveTime)
        }));
        setProductionData(response.data);
      } catch (error) {
        console.error('Error fetching production data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Production Data</h2>
      <table>
        <thead>
          <tr>
            <th>SaveTime</th>
            <th>LineCode</th>
            <th>GAP</th>
            <th>PEND</th>
            <th>MKCNT</th>
          </tr>
        </thead>
        <tbody>
          {productionData.map((data) => (
            <tr key={data.id}>
              <td>{data.SaveTime}</td>
              <td>{data.LineCode}</td>
              <td>{data.GAP}</td>
              <td>{data.PEND}</td>
              <td>{data.MKCNT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionDataComponent;
