import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BsGeoAlt } from "react-icons/bs";
import Divider from '@material-ui/core/Divider';
import { BsCollectionFill } from "react-icons/bs";
import { withRouter } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Github } from 'grommet-icons';
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

const drawerWidth = 300;  // navbar 가로폭
const headerHeight = 115; // header 세로폭

const Media = () => (
  <Box direction="row" gap="xxsmall">
    <Anchor
      a11yTitle="Share feedback on Github"
      href="https://github.com/2021-NEXT-LEVEL/StopKickrani"
      icon={<Github color="#7a57d1" />}
    />
    <a className={styles.police} href="https://www.police.go.kr/index.do">
      <img className={styles.policeIcon} src="/images/police.png" />
    </a>
  </Box>
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  ToolbarLogo: { // Toolbar에 있는 로고
    paddingTop: 0,
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
    paddingTop: 170 - headerHeight, // navbar가 천장에서 떨어진 세로 길이
    backgroundColor: '#18202c',     // navbar 배경색(검정)
  },
  drawerContainer1Title: { // 기록 조회 category
    paddingTop: 5,
    paddingLeft: 20,
    overflow: 'auto',
  },
  drawerContainer1: {     // 기록 조회 안 세부 category
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),  // drawer 안 내용 top padding
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  listItemText:{
    fontFamily:'nanum',
  }
}));

function ClippedDrawer(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(7);

  const clickLocation = () => {
    props.history.push('/');
  }

  const convertDate2Id = (dateObject) => {
    const year = dateObject.getFullYear() + "";
    const month = dateObject.getMonth() < 9 ? "0" + ((dateObject.getMonth() + 1) + "") : (dateObject.getMonth() + 1) + "";
    const date = dateObject.getDate() < 9 ? "0" + (dateObject.getDate() + "") : dateObject.getDate() + "";
    return year + month + date;
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    clickLocation()
  };

  const handleListSubItemClick = (event, index) => {
    setSelectedIndex(index);
    const datePath = convertDate2Id(new Date());
    props.history.push('/detail/' + index + '/' + datePath)
  };

  const handleListReferenceClick = (event, index) => {
    props.history.push('/reference');
    setSelectedIndex(index)
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
          <div className={styles.system_title}>
            개인형 이동장치 종합 관리 시스템
          </div>
          <div className={styles.system_subtitle}>
            Personal Mobility Management System
          </div>
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
        <List component="nav" aria-label="main mailbox folders">
          <List>
            <Typography variant="h6" style={{ color: '#f8f8f8', fontFamily: 'nanum' }} noWrap >
              &nbsp;&nbsp;&nbsp;기록 조회
            </Typography>
          </List>
          <Divider />
          <ListItem
            button key={7}
            selected={selectedIndex === 7}
            onClick={(event) => handleListItemClick(event, 7)}
          >
            <BsCollectionFill style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary={"위치 별 기록 조회"} style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={0}
            selected={selectedIndex === 0}
            onClick={(event) => handleListSubItemClick(event, 0)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 팔정도" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={1}
            selected={selectedIndex === 1}
            onClick={(event) => handleListSubItemClick(event, 1)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 상록원" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={2}
            selected={selectedIndex === 2}
            onClick={(event) => handleListSubItemClick(event, 2)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 신공학관 9층" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={3}
            selected={selectedIndex === 3}
            onClick={(event) => handleListSubItemClick(event, 3)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 본관 앞" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={4}
            selected={selectedIndex === 4}
            onClick={(event) => handleListSubItemClick(event, 4)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 만해광장" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <ListItem
            button key={5}
            selected={selectedIndex === 5}
            onClick={(event) => handleListSubItemClick(event, 5)}
          >&nbsp;
            <BsGeoAlt style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary="동국대학교 혜화관" style={{ color: '#c0c1c5' }} />
          </ListItem>
          <Divider />
          <ListItem
            button key={6}
            selected={selectedIndex === 6}
            onClick={(event) => handleListReferenceClick(event, 6)}
          >
            <BsCollectionFill style={{ color: '#c0c1c5' }} />&nbsp;&nbsp;
            <ListItemText classes={{primary:classes.listItemText}} primary={"Reference"} style={{ color: '#c0c1c5' }} />
          </ListItem>
        </List>
        <div className={styles.drawerContainer2}>
          <p className={styles.footer} style={{ color: '#c0c1c5' }}>
            <Media />
            <Text size="xsmall">&nbsp;&nbsp;©Copyright 2021 NEXT_LEVEL</Text>
          </p>
        </div>
      </Drawer>
      <main className={classes.content}>
      </main>
    </div>
  );
}

export default withRouter(ClippedDrawer);