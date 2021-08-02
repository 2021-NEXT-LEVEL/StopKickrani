import React, { useState, useEffect } from 'react'
import styles from './Statistics.module.css';
import MonthYearPicker from './sections/MonthYearPicker';

function Statistics(props) {
    const defaultResultId = props.match.params.resultId;

    const [resultId, setResultId] = useState(defaultResultId);

    const convertDate2Id = (dateObject) => {
        const year = dateObject.getFullYear() + "";
        const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
        const result = year + month;
        setResultId(result)
    }

    const getSelectedDate = (selectedDate) => {
        convertDate2Id(selectedDate);
    } 

    const movePage = () => {
        props.history.push('/statistics/' + resultId);
    }

    useEffect(() => {
        movePage()
    }, [resultId])

    return (
        <div className={styles.container}>
            <MonthYearPicker getSelectedDate={getSelectedDate} datePath={resultId}/>

            {/* 월별 통계 그래프 */}

        </div>
    )
}

export default Statistics;
