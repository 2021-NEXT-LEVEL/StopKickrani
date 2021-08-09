import React, { useState, useEffect } from 'react';
import styles from './GraphPage.module.css';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from'@material-ui/core/colors';
import { ResponsiveLine } from '@nivo/line';
import { render } from "react-dom";
import MyResponsiveLine from "./sections/charts";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

var data = [
    {
      id: "helmet",
      color: "hsl(267, 70%, 50%)",
      data: [
        {
          x: "1초",
          y: 1
        },
        {
          x: "2초",
          y: 2
        },
        {
          x: "3초",
          y: 1
        },
        {
          x: "4초",
          y: 0
        },
        {
          x: "5초",
          y: 1
        }
      ]
    },
    {
      id: "non-helmet",
      color: "hsl(85, 70%, 50%)",
      data: [
        {
          x: "1초",
          y: 1
        },
        {
          x: "2초",
          y: 2
        },
        {
          x: "3초",
          y: 1
        },
        {
          x: "4초",
          y: 0
        },
        {
          x: "5초",
          y: 1
        }
      ]
    },
    {
      id: "over-two",
      color: "hsl(180, 70%, 50%)",
      data: [
        {
          x: "1초",
          y: 2
        },
        {
          x: "2초",
          y: 3
        },
        {
          x: "3초",
          y: 0
        },
        {
          x: "4초",
          y: 2
        },
        {
          x: "5초",
          y: 1
        }
      ]
    }
  ];

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

    const [videoId, setVideoId] = useState(props.match.params.videoId)

    const moveToDetail = () => {
        props.history.push('/detail/' + videoId)
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
            <div>
                <h1>{videoId}</h1>
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
