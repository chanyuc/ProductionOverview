import ProductionDataComponent from './Components/ProductionDataComponent';
import ProductionDataChart from './Components/ProductionDataChart';
import './App.css';

function App() {
  return (
    <div className="App">
      Production Overview
      {/* <ProductionDataComponent /> */}
      <ProductionDataChart />
    </div>
  );
}

export default App;
