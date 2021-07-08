import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../App';
import './DateAndPriceFilters.scss';

const DateAndPriceFilters = () => {

    const globalData = useContext(GlobalContext);
    const [fromDateValue, setFromDateValue] = useState('2021-01-01');
    const [toDateValue, setToDateValue] = useState('2021-01-07');
    const [defaultValueSet, setDefaultValueSet] = useState(false);

    const formatDateForInput = (timeStamp) => {
        let formattedDate;
        const d = new Date(timeStamp);
        const dd = (d.getDate().toString().length === 1) ? d.getDate().toString().padStart(2, '0') : d.getDate();
        const mm = ((d.getMonth() + 1).toString().length === 1) ? (d.getMonth() + 1).toString().padStart(2, '0') : (d.getMonth() + 1);
        const yyyy = d.getFullYear().toString();
        formattedDate = `${yyyy}-${mm}-${dd}`;
        return formattedDate;
    };

    useEffect(() => {
        setFromDateValue(formatDateForInput(globalData.fromTimeStamp));
        setToDateValue(formatDateForInput(globalData.toTimeStamp));
        if (!defaultValueSet) {
            let twoDaysAgo = new Date();
            let thirtyTwoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            thirtyTwoDaysAgo.setDate(thirtyTwoDaysAgo.getDate() - 32);
            globalData.setFromTimeStamp(thirtyTwoDaysAgo.getTime());
            globalData.setToTimeStamp(twoDaysAgo.getTime());
            setDefaultValueSet(true);
        }
    }, [globalData.fromTimeStamp, globalData.toTimeStamp]);

    const selectPriceType = (e) => {
        let priceType = e.target.value;
        globalData.setPriceType(priceType);
    };

    const selectFromDate = (e) => {
        if (e.target.value === '') {
            alert('Please Select a Valid Date');
            return false;
        }
        const toDate = new Date(globalData.toTimeStamp);
        const fromDate = new Date(e.target.value);
        if (fromDate >= toDate) {
            alert('Please Select an Earlier Date');
            return false;
        }
        setFromDateValue(e.target.value);
        globalData.setFromTimeStamp(fromDate.getTime());
    };

    const selectToDate = (e) => {
        if (e.target.value === '') {
            alert('Please Select a Valid Date');
            return false;
        }
        const fromDate = new Date(globalData.fromTimeStamp);
        const toDate = new Date(e.target.value);
        if (toDate <= fromDate) {
            alert('Please Select a Later Date');
            return false;
        }
        setToDateValue(e.target.value);
        globalData.setToTimeStamp(toDate.getTime());
    };

    return (
        <div id="dateAndPriceFilters">
            <div>
                I want to see
                <select id="priceType" onChange={selectPriceType}>
                    <option value="o">open</option>
                    <option value="h">high</option>
                    <option value="l">low</option>
                    <option value="c">close</option>
                </select>
                prices between
                <input type="date" id="fromDate" value={fromDateValue} onChange={selectFromDate} max={formatDateForInput((new Date().getTime()))}></input>
                and
                <input type="date" id="toDate" value={toDateValue} onChange={selectToDate} max={formatDateForInput((new Date().getTime()))}></input>
            </div>
        </div>
    );

};

export default DateAndPriceFilters;