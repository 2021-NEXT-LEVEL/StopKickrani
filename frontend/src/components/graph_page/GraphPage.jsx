import React, { useState, useEffect } from 'react';
import styles from './GraphPage.module.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Charts from "./sections/charts";
import { USER_SERVER } from '../../Config';
//import data from '../../public/detect_log/data.json';

function GraphPage(props) {

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    graphDate: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
  });
  
  const DrawGraph = () => (
    <div style={styles}>
      {/*<h1>Nivo basic demo</h1>*/}
      <div style={{ height: "450px" }}>
        <Charts loc={loc} videoId={videoId}/>
        {/* <ResponsiveBar data={data} keys={["earnings"]} indexBy="quarter" /> */}
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
          if (item.value == 'non-helmet') {
            numOfNonHelmet += 1
          } else if (item.value == 'over-two') {
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
        <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#7a57d1' }}>
          {videoId}</p>
      </div>
      <div>
        <DrawGraph />
      </div>
      <div className={styles.ButtonPos}>
        <ColorButton variant="contained" color="primary" className={classes.graphButton} onClick={moveToDetail}>
          DETAIL
        </ColorButton>
      </div>
      non-helmet 수 : {count[1]}<p />over-two 수 : {count[0]}
    </>
  )
}

export default GraphPage;