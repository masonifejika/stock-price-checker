import { useContext } from 'react';
import './StockSelectorButton.scss';
import { GlobalContext } from '../App';

const StockSelectorButton = () => {

    const globalData = useContext(GlobalContext);

    return (
        <button data-stock-selector-state={globalData.stockSelectorState} onClick={() => globalData.setStockSelectorState('open')}>
            Select Your Stocks
        </button>
    );
};

export default StockSelectorButton;