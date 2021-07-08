import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../App';
import './StockSelector.scss';
import getStocks from '../services/getStocks';

const StockSelector = () => {

    const globalData = useContext(GlobalContext);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        getStocks().then(data => {
            let sortedData = data.sort((a, b) => {
                let x = 0;
                if (a.description > b.description) { x = 1; }
                else if (a.description < b.description) { x = -1; }
                return x;
            });
            sortedData.splice(0, 6); // remove the first 6 stocks because they're dummies
            setStocks(sortedData);
        });
    }, []);

    const selectStock = (e, symbol, companyName) => {
        e.preventDefault();
        e.stopPropagation();
        const listItem = e.target.parentElement;
        const alreadySelected = (listItem.dataset.selected === 'true') ? true : false;
        let selectedStocks = globalData.selectedStocks;
        if (alreadySelected) {
            listItem.dataset.selected = 'false';
            const stockIndex = selectedStocks.findIndex(x => x.symbol === symbol);
            selectedStocks.splice(stockIndex, 1);
            globalData.setSelectedStocks(selectedStocks);
            globalData.setNoOfSelectedStocks(selectedStocks.length);
        }
        else {
            if (selectedStocks.length === 3) {
                alert('Sorry, You Can Only Select a Maximum of 3 Stocks!');
                return false;
            }
            listItem.dataset.selected = 'true';
            selectedStocks.push({ symbol: symbol, companyName: companyName });
            globalData.setSelectedStocks(selectedStocks);
            globalData.setNoOfSelectedStocks(selectedStocks.length);
        }
    };

    const StockList = stocks.map((stock) =>
        <li key={stock.symbol} data-selected="false">
            <a href="#" onClick={(e) => { selectStock(e, stock.symbol, stock.description) }}>
                <span className="company-name">{stock.description}</span>
                <span className="symbol">{stock.symbol}</span>
            </a>
        </li>
    );

    return (
        <>
            <div id="darkOverlay" onClick={() => { globalData.setStockSelectorState('closed') }}></div>
            <div id="stockSelector" className={globalData.stockSelectorState}>
                <button className="close" onClick={() => { globalData.setStockSelectorState('closed') }}>+</button>
                <header>
                    <h3>Please Choose Up To 3 NASDAQ Stocks</h3>
                    <span>{stocks.length.toLocaleString('en')} stocks in total &nbsp;&nbsp;|&nbsp;&nbsp; {globalData.noOfSelectedStocks} of 3 selected</span>
                </header>
                <section>
                    <ul data-number-of-selections={globalData.noOfSelectedStocks}>
                        {StockList}
                    </ul>
                </section>
            </div>
        </>
    );
}

export default StockSelector;