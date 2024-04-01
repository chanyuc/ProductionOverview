import React from "react";
import { Routes, Route, NavLink } from 'react-router-dom';

import ProductionDataChart from './Components/ProductionDataChart';
import ReceiveOrderChart from './Components/ReceiveOrderChart';
import './App.css';

// (CY): Routing to specific graph components
const App = () => {
  return (
    <div className="App">

      <Routes className="route">
        <Route exact path="/ProductionOverview/ProductionData" element={<ProductionDataChart />}/>
        <Route path="/ProductionOverview" element={<ProductionDataChart />}/>
        <Route path="/ProductionOverview/RecvOrderCount" element={<ReceiveOrderChart />} />
      </Routes>

      <nav className="nav">
        <NavLink className="nav-link" exact="true" to="/ProductionOverview/ProductionData" activeclassname="active">
          <div className="nav-text">Production Data</div>
        </NavLink>
        <NavLink className="nav-link" exact="true" to="/ProductionOverview/RecvOrderCount" activeclassname="active">
          <div className="nav-text">RecvOrder Count</div>
        </NavLink>
      </nav>
    </div>
  );
}

export default App;
