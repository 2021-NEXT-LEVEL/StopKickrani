import React, { useState, useEffect, useRef } from 'react';
import styles from './DetailPage.module.css';
import TimePicker from './sections/TimePicker';
import ReactPlayer from 'react-player'
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

    const player = useRef(null);

    const [playing, setPlaying] = useState(true);
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(0);
    const [start, setStart] = useState(false);

    const [videoId, setVideoId] = useState(defaultVideoId);
    const [loc, setLoc] = useState(defaultLoc);
    const [videoURL, setVideoURL] = useState();
    const [infos, setInfos] = useState([]); // db에서 받아온 log, value
    const [show, setShow] = useState(false);
    const [second, setSecond] = useState();

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

    const handleSeekMouseDown = e => {
        setSeeking(true);
    }

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.innerHTML));
    }

    const handleSeekMouseUp = e => {
        setSeeking(false);
        player.current.seekTo(parseFloat(timeToSec(e.target.innerHTML)));
    }

    const handleProgress = state => {
        if (!seeking) {
            setPlayed(state.played);
        }
        setSecond(parseFloat(state.playedSeconds).toFixed(3))
    }

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

    const moveToGraph = () => {
        props.history.push('/graph/' + loc + '/' + videoId)
    }

    const setLogInfo = (str) => {
        if (str.length === 8) {
            str += '.000000'
        }
        return str.substring(0, 12)
    }

    const timeToSec = (time) => {
        let time_ = setLogInfo(time)
        const hour = parseInt(time_.substring(0, 2))
        const minutes = parseInt(time_.substring(3, 5))
        const seconds = parseInt(time_.substring(6, 8))
        const milliseconds = parseInt(time_.substring(9, 12))
        const result = hour * 3600 + minutes * 60 + seconds + milliseconds * 0.001
        return result
    }

    const rows = [createData(videoURL, videoId)];

    useEffect(() => {
        movePage()

        // get video URL
        fetch(`${USER_SERVER}/video/${loc}/${videoId}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let urls = response[0].url.split('watch?v=')
                setVideoURL(YOUTUBE_URL + '/' + urls[1] + '?autoplay=1&modestbranding=1&rel=0&autohide=1&rel=0&controls=0&iv_load_policy=3&disablekb=1')
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
                const info_data = []
                response.map((item) => {
                    info_data.push([item.log, item.value])
                })
                setInfos(info_data)
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
                    <div className={styles.table}>
                        <Table stickyHeader className={classes.table} aria-label="video table">
                            <TableHead>
                                <TableRow className={styles.tableRow}>
                                    <TableCell><b>Video</b></TableCell>
                                    <TableCell><b>Logs</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.url}>
                                        <TableCell component="th" scope="row">
                                            <div className="iframeBox">
                                                {videoURL &&
                                                    <ReactPlayer
                                                        className={styles.reactplayer}
                                                        width="44vw"
                                                        height="calc(44vw * 0.5625)"
                                                        ref={player}
                                                        playing={playing}
                                                        url={videoURL}
                                                        controls={false}
                                                        progressInterval
                                                        onProgress={handleProgress}
                                                    />
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell className={styles.logBox}>
                                            {played > 0 && infos.map((data) =>
                                                (parseFloat(second) >= parseFloat(timeToSec(data[0]))) && <li key={data[0]}>
                                                    <div className={styles.log_font}>
                                                        <font
                                                            className={styles.timeLog}
                                                            onMouseDown={handleSeekMouseDown}
                                                            onChange={handleSeekChange}
                                                            onMouseUp={handleSeekMouseUp}
                                                        >{setLogInfo(data[0])}
                                                        </font>
                                                        <font>&emsp;&emsp;{data[1]}</font>
                                                    </div>
                                                </li>

                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
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