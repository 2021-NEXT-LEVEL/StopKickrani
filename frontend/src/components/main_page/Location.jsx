import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from '@material-ui/core/Button';
import RoomIcon from '@material-ui/icons/Room';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import LocationData from "./sections/LocationData";
import { USER_SERVER } from '../../Config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
    padding: theme.spacing(2),
    gridTemplateColumns: "550px 550px"
  },
  paper: {
    padding: theme.spacing(3),
    margin: "20px 10px auto",
    maxWidth: 500,
    color: "black",
    fontFamily: 'nanum'
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  listItemText:{
    fontFamily:'nanum',
  }
}));

function ComplexGrid(props) {
  const classes = useStyles();

  const [locations, setLocations] = useState([])

  useEffect(() => {

    fetch(`${USER_SERVER}`)
      .then(response => response.json())
      .then(response => {
        let datas = []
        response.forEach((item) => {
          if (!datas.includes(item.location)) {
            datas.push(item.location)
          }
        })
        setLocations(datas)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const convertDate2Id = (dateObject) => {
    const year = dateObject.getFullYear() + "";
    const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
    const date = dateObject.getDate() < 9 ? "0" + (dateObject.getDate() + "") : dateObject.getDate() + "";
    const result = year + month + date;
    return result
  }

  const clickViewMore = (loc) => {
    const datePath = convertDate2Id(new Date());
    props.history.push('/detail/' + loc + '/' + datePath);
  }

  const rendering = () => {
    const result = [];
    for (let i = 0; i < locations.length; i++) {
      result.push(<div className="item">
        <Paper  className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="exit4"
                  src={LocationData[i].img}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" >
                    <RoomIcon style={{ verticalAlign: 'middle' }} />&nbsp; {locations[i]}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {LocationData[i].address}
                  </Typography>

                </Grid>
                <Grid item>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<VideoCallIcon />}
                    onClick={() => clickViewMore(i)}
                  >
                    View More
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div >);
    }
    return result;
  };


  return (
      <div className={classes.root}>
        {rendering()}
      </div>
  );
}

export default ComplexGrid;