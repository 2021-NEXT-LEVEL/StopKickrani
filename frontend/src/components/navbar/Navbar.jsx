import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BsGeoAlt } from "react-icons/bs";
import { BsCollectionFill } from "react-icons/bs";
import { withRouter } from 'react-router-dom';
import styles from './Navbar.module.css';

const drawerWidth = 300;  // navbar 가로폭
const headerHeight = 100; // header 세로폭

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  ToolbarLogo: { // Toolbar에 있는 로고
    paddingRight: 15,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#7a57d1', //7a57d1
    height: headerHeight,
    paddingTop: 10, // vertical center
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#18202c',
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 140 - headerHeight, // navbar가 천장에서 떨어진 세로 길이
    backgroundColor: '#18202c',     // navbar 배경색(검정)
  },
  drawerContainer1Title: { // 기록 조회 category
    paddingTop: 5,
    paddingLeft: 15,
    overflow: 'auto',
  },
  drawerContainer1: {     // 기록 조회 안 세부 category
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),  // drawer 안 내용 top padding
  },
}));

function ClippedDrawer(props) {
  const classes = useStyles();

  const convertDate2Id = (dateObject) => {
    const year = dateObject.getFullYear() + "";
    const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
    const result = year + month;
    return result;
}

  const clickLocation = () => {
    props.history.push('/');
  }

  const clickStatistics = () => {
    const datePath = convertDate2Id(new Date());
    props.history.push('/statistics/' + datePath);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.ToolbarLogo}>
            <img
              src='/images/nextlevellogo2.png'
              alt='logo'
              className={styles.logoImg}
              onClick={clickLocation}
            />
          </div>
          <Typography variant="h5" noWrap>
            Stop Kickrani
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer1Title}>
          <List>
            <Typography variant="h6" style={{color: '#c0c1c5'}} noWrap >
              기록 조회
            </Typography>
          </List>
        </div>
        <div className={classes.drawerContainer1}>
          <List>
            <ListItem button key={0} onClick={clickLocation}>
              <ListItemIcon>
                <BsGeoAlt style={{color: '#c0c1c5'}}/>
              </ListItemIcon>
              <ListItemText primary={"위치 별 기록 조회"} style={{color: '#c0c1c5'}}/>
            </ListItem>       
            <ListItem button key={1} onClick={clickStatistics}>
              <ListItemIcon> 
                <BsCollectionFill style={{color: '#c0c1c5'}}/>
              </ListItemIcon>
              <ListItemText primary={"통합 기록 조회"} style={{color: '#c0c1c5'}}/>
            </ListItem>
          </List>
          <Divider style={{backgroundColor: '#c0c1c5'}} />
        </div>
      </Drawer>
      <main className={classes.content}>
      </main>
    </div>
  );
}

export default withRouter(ClippedDrawer);