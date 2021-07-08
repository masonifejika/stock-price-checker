const getStocks = () => {

    return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNAS&token=c3h09aqad3i83du7kv0g').then(res => res.json());

};

export default getStocks;