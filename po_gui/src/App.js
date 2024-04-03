import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import ProductionDataChart from './Components/ProductionDataChart';
import ReceiveOrderChart from './Components/ReceiveOrderChart';
import './App.css';

// (CY): Routing to specific graph components
const App = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const handlePrevPage = () => {
    setPageNumber(pageNumber + 1);
  };
  
  const handleNextPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="App">

      <Routes className="route">
        <Route exact path="/ProductionOverview/ProductionData" element={<ProductionDataChart pageNumber={pageNumber} />}/>
        <Route path="/ProductionOverview" element={<ProductionDataChart pageNumber={pageNumber} />}/>
        <Route path="/ProductionOverview/RecvOrderCount" element={<ReceiveOrderChart pageNumber={pageNumber} />} />
      </Routes>

      <div className="nav-container">
        <nav className="nav">
          <NavLink className="nav-link" exact="true" to="/ProductionOverview/ProductionData" activeclassname="active">
            <div className="nav-text">Production Data</div>
          </NavLink>
          <NavLink className="nav-link" exact="true" to="/ProductionOverview/RecvOrderCount" activeclassname="active">
            <div className="nav-text">RecvOrder Count</div>
          </NavLink>
        </nav>
        <div className="button-container">
          <button className="nav-button" onClick={handlePrevPage}>
            Prev
          </button>
          <button className="nav-button" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
