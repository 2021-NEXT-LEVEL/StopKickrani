import React, { useState, useEffect } from 'react';
import styles from './GraphPage.module.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from'@material-ui/core/colors';
import MyResponsiveLine from "./sections/charts";
import data from './sections/data.json';
//import data from '../../public/detect_log/data.json';

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
      <MyResponsiveLine data={data} />
      {/* <ResponsiveBar data={data} keys={["earnings"]} indexBy="quarter" /> */}
    </div>
  </div>
);


function GraphPage(props) {

  const classes = useStyles();

  const [loc, setLoc] = useState(props.match.params.loc)
  const [videoId, setVideoId] = useState(props.match.params.videoId)

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
  })

    return (
        <>
            <div className={classes.graphDate}>
            <p style={{fontSize:'30px', fontWeight: 'bold', color: '#7a57d1'}}>
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
        </>
    )
}

export default GraphPage;
