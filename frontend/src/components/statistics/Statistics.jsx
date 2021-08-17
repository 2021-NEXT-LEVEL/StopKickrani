import React, { useState, useEffect } from 'react'
import styles from './Statistics.module.css';
import MonthYearPicker from './sections/MonthYearPicker';
import ItemList from './sections/ItemList';
import { USER_SERVER } from '../../Config';

function Statistics(props) {
    const defaultResultId = props.match.params.resultId;

    const [videos, setVideos] = useState([]);
    const [resultId, setResultId] = useState(defaultResultId);

    const convertDate2Id = (dateObject) => {
        const result = dateObject.substring(0, 4) + dateObject.substring(5, 7)
        setResultId(result)
    }

    const getSelectedDate = (selectedDate) => {
        convertDate2Id(selectedDate);
    }

    const movePage = () => {
        props.history.push('/statistics/' + resultId);
    }

    useEffect(() => {
        // get (log, value)
        fetch(`${USER_SERVER}/statistics/${resultId}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setVideos(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }, []);


    useEffect(() => {
        movePage()
    }, [resultId])

    return (
        <div className={styles.container}>
            <MonthYearPicker getSelectedDate={getSelectedDate} datePath={resultId} />
            <ItemList />
        </div>

    )
}

export default Statistics;