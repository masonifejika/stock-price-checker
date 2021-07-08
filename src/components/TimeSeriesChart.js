import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import getPrices from '../services/getPrices';
import './TimeSeriesChart.scss';

const TimeSeriesChart = (props) => {

    const globalData = useContext(GlobalContext);
    const [chartData, setChartData] = useState([]);
    const chartColours = ['#8884d8', '#62b481', '#be5570'];

    useEffect(() => {
        let fromTimeStamp = Math.round(globalData.fromTimeStamp / 1000); 
        let toTimeStamp = Math.round(globalData.toTimeStamp / 1000);
        let noOfRecords = 0;
        let constructedChartData = [];
        if (globalData.noOfSelectedStocks > 0) {
            getPrices(globalData.selectedStocks[0].symbol, fromTimeStamp, toTimeStamp).then(data => {
                noOfRecords = data['t'].length;
                for (var i = 0; i < noOfRecords; i++) {
                    let record = {};
                    let recordDate = new Date(data.t[i] * 1000);
                    let displayDate = recordDate.toDateString().split(' ')[2] + ' ' + recordDate.toDateString().split(' ')[1];
                    record.date = displayDate;
                    record[globalData.selectedStocks[0].companyName] = data[globalData.priceType][i];
                    constructedChartData.push(record);
                }
                if (globalData.noOfSelectedStocks === 1) {
                    setChartData(constructedChartData);
                }
            }).then(() => {
                if (globalData.noOfSelectedStocks > 1) {
                    getPrices(globalData.selectedStocks[1].symbol, fromTimeStamp, toTimeStamp).then(data => {
                        constructedChartData.forEach((record, i) => {
                            record[globalData.selectedStocks[1].companyName] = data[globalData.priceType][i];
                        });
                        if (globalData.noOfSelectedStocks === 2) {
                            setChartData(constructedChartData);
                        }
                    });
                }
            }).then(() => {
                if (globalData.noOfSelectedStocks === 3) {
                    getPrices(globalData.selectedStocks[2].symbol, fromTimeStamp, toTimeStamp).then(data => {
                        constructedChartData.forEach((record, i) => {
                            record[globalData.selectedStocks[2].companyName] = data[globalData.priceType][i];
                        });
                        setChartData(constructedChartData);
                    });
                }
            });
        }
    }, [globalData.noOfSelectedStocks, globalData.selectedStocks, globalData.fromTimeStamp, globalData.toTimeStamp, globalData.priceType]);

    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Stock Price in US Dollars', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {globalData.selectedStocks.map((stock, i) => <Line type="monotone" key={stock.symbol} dataKey={stock.companyName} stroke={chartColours[i]} />) }
        </LineChart>
      </ResponsiveContainer>
    );

};

export default TimeSeriesChart;