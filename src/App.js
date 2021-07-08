import { createContext, useState, useEffect } from 'react';
import PageHeader from './components/PageHeader';
import DateAndPriceFilters from './components/DateAndPriceFilters';
import StockSelector from './components/StockSelector';
import TimeSeriesChart from './components/TimeSeriesChart';

const GlobalContext = createContext();

function App() {

  const [stockSelectorState, setStockSelectorState] = useState('closed');
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [noOfSelectedStocks, setNoOfSelectedStocks] = useState(0);
  const [fromTimeStamp, setFromTimeStamp] = useState(0);
  const [toTimeStamp, setToTimeStamp] = useState(0);
  const [priceType, setPriceType] = useState('o');

  let globalData = {

    stockSelectorState: stockSelectorState,
    setStockSelectorState,
    selectedStocks: selectedStocks,
    setSelectedStocks,
    noOfSelectedStocks: noOfSelectedStocks,
    setNoOfSelectedStocks,
    fromTimeStamp: fromTimeStamp,
    setFromTimeStamp,
    toTimeStamp: toTimeStamp,
    setToTimeStamp,
    priceType: priceType,
    setPriceType

  };

  useEffect(() => {
    const $body = document.querySelector('body');
    $body.setAttribute('data-stock-selector-state', stockSelectorState);
  }, [stockSelectorState, noOfSelectedStocks]);

  return (
    <>
      <GlobalContext.Provider value={globalData}>
        <div>
          <PageHeader />
          <DateAndPriceFilters />
          <div className="chart-container">
            <TimeSeriesChart noOfSelectedStocks={noOfSelectedStocks} selectedStocks={selectedStocks} fromTimeStamp={fromTimeStamp} toTimeStamp={toTimeStamp} />
          </div>
        </div>
        <StockSelector />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
export { GlobalContext };