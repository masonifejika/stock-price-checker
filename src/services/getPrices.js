const getPrices = (symbol, fromTimeStamp, toTimeStamp) => {

    return fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromTimeStamp}&to=${toTimeStamp}&token=c3h09aqad3i83du7kv0g`).then(res => res.json());

};

export default getPrices;