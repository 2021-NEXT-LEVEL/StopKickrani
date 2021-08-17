import React, { useState, useEffect } from 'react';
import styles from './DetailPage.module.css';
import TimePicker from './sections/TimePicker';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import { USER_SERVER, YOUTUBE_URL } from '../../Config';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function DetailPage(props) {
    const classes = useStyles();
    const defaultVideoId = props.match.params.videoId;
    const defaultLoc = props.match.params.loc;

    const [videoId, setVideoId] = useState(defaultVideoId);
    const [loc, setLoc] = useState(defaultLoc);
    const [videoURL, setVideoURL] = useState('');
    const [infos, setInfos] = useState([]);

    const convertDate2Id = (dateObject) => {
        const year = dateObject.getFullYear() + "";
        const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
        const date = dateObject.getDate() < 9 ? "0" + (dateObject.getDate() + "") : dateObject.getDate() + "";
        const result = year + month + date;
        setVideoId(result)
    }

    const getSelectedDate = (selectedDate) => {
        convertDate2Id(selectedDate);
    }

    const movePage = () => {
        props.history.push('/detail/' + loc + '/' + videoId);
    }

    const createData = (url, logs) => {
        return { url, logs };
    }

    const createLogData = (log, value) => {
        return (videoId.substring(0, 4) + '/' + videoId.substring(4, 6) + '/' + videoId.substring(6, 8) + ' ' + log + ' ' + value);
    }

    const moveToGraph = () => {
        props.history.push('/graph/' + loc + '/' + videoId)
    }

    const rows = [createData(videoURL, videoId)];

    const ColorButton = withStyles((theme) => ({
        root: {
            marginBottom: '10px',
            color: theme.palette.getContrastText(purple[500]),
            backgroundColor: '#7558CA',
            '&:hover': {
                backgroundColor: '#513d8d',
            },
        },
    }))(Button);

    useEffect(() => {
        movePage()

        // get video URL
        fetch(`${USER_SERVER}/video/${loc}/${videoId}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let urls = response[0].url.split('watch?v=')
                setVideoURL(YOUTUBE_URL + '/' + urls[1])
            }
            )
            .catch((err) => {
                console.log(err)
            })

        // get video info (log, value)
        fetch(`${USER_SERVER}/detail/${loc}/${videoId}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const log_data = []
                response.map((item) => log_data.push(createLogData(item.log, item.value)))
                setInfos(log_data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [videoId]);

    return (
        <>
            <div className={styles.container}>
                <TimePicker getSelectedDate={getSelectedDate} datePath={videoId} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="video table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Video</b></TableCell>
                                <TableCell><b>Logs</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.url}>
                                    <TableCell component="th" scope="row">
                                        <div className="iframeBox">
                                            <iframe
                                                // width="560px"
                                                // height="315px"
                                                width="793px"
                                                height="446px"
                                                src={videoURL}
                                                frameBorder="0"
                                                allow="autoplay; encrypted-media; gyroscope;"
                                                allowFullScreen
                                                scrolling="no"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {infos.map((log) => <li key={log}>{log}</li>)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={styles.ButtonPos}>
                <ColorButton variant="contained" color="primary" className={classes.graphButton} onClick={moveToGraph}>
                    GRAPH
                </ColorButton>
            </div>
        </>
    )
}

export default DetailPage;