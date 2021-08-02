import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from '@material-ui/core/Button';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "25px auto",
    maxWidth: 500,
    color: "black",
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
  }
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant = "outlined" className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
              className={classes.img}
              alt="exit4"
               src={require("C:\\Users\\길유정\\Desktop\\frontend\\src\\components\\images\\logo2.png").default}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={11} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  충무로역 4번출구
                </Typography>
                <Typography variant="body2" gutterBottom>
                서울특별시 중구 필동1가 
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            <Button
        variant="outlined"
        color="default"
        startIcon={<CameraFrontIcon />
        }
      >
        Click Here
      </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
              className={classes.img}
              alt="exit4"
               src={require("C:\\Users\\길유정\\Desktop\\frontend\\src\\components\\images\\logo.png").default}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={11} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  충무로역 5번출구
                </Typography>
                <Typography variant="body2" gutterBottom>
                  서울특별시 중구 필동1가 
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            <Button
        variant="contained"
        color="default"
        startIcon={<CameraFrontIcon />
        }
      >
        Click Here
      </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    
  );
}


