import React, { useState, useEffect } from 'react';
import styles from './DetailPage.module.css';
import TimePicker from './sections/TimePicker';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from'@material-ui/core/colors';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function DetailPage(props) {
    const classes = useStyles();
    const defaultVideoId = props.match.params.videoId;
    const variable = { videoId: defaultVideoId };

    const [videoId, setVideoId] = useState(defaultVideoId);
    const [videoURL, setVideoURL] = useState("");
    const [video, setVideo] = useState();
    const [log, setLog] = useState([]);

    const sample_log = [[videoId.substring(0, 4) + '/' + videoId.substring(4, 6) + '/' + videoId.substring(6, 8) + " 10:41:10 non-helmet 2"], 
                        [videoId.substring(0, 4) + '/' + videoId.substring(4, 6) + '/' + videoId.substring(6, 8) + " 10:41:11 non-helmet 2"]]

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
        props.history.push('/detail/' + videoId);
    }

    const createData = (url, logs) => {
        return { url, logs };
    }

    const moveToGraph = () => {
        props.history.push('/graph/' + videoId)
    }

    // const rows = [createData(videoURL, log)];
    const rows = [createData("sample sample sample samples", videoId)];

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

    // DB에 저장된 날짜별 비디오 주소 가져오기 (using youtube api)
    const getVideo = () => {
        // Axios.get('/api/video/getVideos', variable)
        // .then(response => {
        //     if(response.data.success) {
        //         console.log(response.data);
        //         setVideo(response.data.videos);
        //     } else {
        //         alert('비디오 가져오기를 실패했습니다.');
        //     }
        // });
    }

    useEffect(() => {
        movePage()
        // if (!isNaN(videoId)) {
        //     video && getVideo()
        // } 


    }, [videoId]);
    
    return (
        <>
        <div className={styles.container}>
            <TimePicker getSelectedDate={getSelectedDate} datePath={videoId}/>
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
                                    src="https://www.youtube.com/embed/z0KqM3oAnus"
                                    frameBorder="0" 
                                    allow="autoplay; encrypted-media; gyroscope;" 
                                    allowFullScreen
                                    scrolling="no" 
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            {sample_log.map((log) => <li key={log}>{log}</li>)} 
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