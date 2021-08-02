import React, { useState, useEffect } from 'react';
import styles from './GraphPage.module.css';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from'@material-ui/core/colors';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function GraphPage(props) {

    const classes = useStyles();

    const [videoId, setVideoId] = useState(props.match.params.videoId)

    const moveToDetail = () => {
        props.history.push('/detail/' + videoId)
    }

    const ColorButton = withStyles((theme) => ({
        root: {
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
                <h2>{videoId}</h2>
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
