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

const drawerWidth = 300;
const headerHeight = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#7a57d1',
    height: headerHeight,
    paddingTop: 15, // vertical center
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#18202c',
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 140 - headerHeight,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src = '/images/nextlevellogo2.png' width = '106' height = '80' alt='logo' />
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
        <div className={classes.drawerContainer}>
          <List>
            {['위치 별 기록 조회', '통합 기록 조회'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                {index === 0 && <BsGeoAlt />}
                {index === 1 && <BsCollectionFill />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
      </main>
    </div>
  );
}
