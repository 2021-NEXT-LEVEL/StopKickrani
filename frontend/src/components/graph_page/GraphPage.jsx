import React, { useState, useEffect } from 'react';
import styles from './GraphPage.module.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Charts from "./sections/charts";
import { USER_SERVER } from '../../Config';

function GraphPage(props) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    graphDate: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
  });

  const DrawGraph = () => (
    <div style={styles}>
      <div style={{ height: "450px" }}>
        <Charts loc={loc} videoId={videoId} />
      </div>
    </div>
  );

  const classes = useStyles();

  const [loc, setLoc] = useState(props.match.params.loc)
  const [videoId, setVideoId] = useState(props.match.params.videoId)
  const [count, setCount] = useState([])
  let numOfNonHelmet = 0
  let numOfOverTwo = 0
  const moveToDetail = () => {
    props.history.push('/detail/' + loc + '/' + videoId)
  }

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
    // get number of (log, value)
    fetch(`${USER_SERVER}/graph/${loc}/${videoId}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)


        response.forEach((item) => {
          if (item.value === 'non-helmet') {
            numOfNonHelmet += 1
          } else if (item.value === 'over-two') {
            numOfOverTwo += 1
          }
        })
        setCount([numOfOverTwo, numOfNonHelmet])

      })
      .catch((err) => {
        console.log(err)
      })

  }, []);

  return (
    <>
      <div className={classes.graphDate}>
        <p style={{ fontSize: '25px', fontWeight: 'bold', color: '#7a57d1' }}>
        {parseInt(videoId/10000)}년 {parseInt((videoId%10000)/100)}월 {videoId%100}일</p>
      </div>
      <div>
        <DrawGraph />
      </div>
      <div className={styles.ButtonPos}>
        <ColorButton variant="contained" color="primary" className={classes.graphButton} onClick={moveToDetail}>
          DETAIL
        </ColorButton>
      </div>
    </>
  )
}

export default GraphPage;