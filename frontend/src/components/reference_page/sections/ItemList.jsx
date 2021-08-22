import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import itemData from './itemData.js';
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    paddingLeft: 50,
    paddingTop: 20,
    width: 1000,
    height: 400,
  },
  image: {
    width: 160,
    height: 160
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: 500,
    height: 300,
    textAlign: 'justify',
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 3),
  },
}));

function ItemList(props) {

  const [imgInfo, setImageInfo] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (imgTitle) => {
    setOpen(true);
    itemData.map((item) => {
      if (item.title === imgTitle) {
        setImageInfo(item)
      }
    })

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ImageList rowHeight={160} className={classes.imageList} cols={5} padding={20}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1}>
            <ButtonBase className={classes.image} onClick={() => handleOpen(item.title)}>
              <img src={item.img} alt={item.title} className={classes.img} />
            </ButtonBase>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">{imgInfo.data}</h2>
                  <p id="transition-modal-description">{imgInfo.data2}</p>
                </div>
              </Fade>
            </Modal>
          </ImageListItem>
        ))
        }
      </ImageList>
    </div>

  )
}

export default ItemList;