import './PageHeader.scss';
import StockSelectorButton from './StockSelectorButton';

const PageHeader = () => {
    return (
        <header>
            <h1>Stock Price Checker</h1>
            <StockSelectorButton />
        </header>
    );
};

export default PageHeader;