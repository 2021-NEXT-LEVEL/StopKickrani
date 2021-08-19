import React, { useState, useEffect } from 'react'
import styles from './ReferencePage.module.css';
import ItemList from './sections/ItemList';
import { USER_SERVER } from '../../Config';

function ReferencePage(props) {
    const defaultResultId = props.match.params.resultId;

    const [videos, setVideos] = useState([]);


    // useEffect(() => {
    //     // get (log, value)
    //     fetch(`${USER_SERVER}/reference}`)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response)
    //             setVideos(response)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }, []);

    return (
        <div className={styles.container}>
            <ItemList />
        </div>

    )
}

export default ReferencePage;