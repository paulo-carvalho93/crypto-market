import React, { useState } from 'react';
import { useCryptoContext } from '../../CryptoContext';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, AppBar, Tabs, Tab } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    width: 85,
    height: 40,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    color: "white",
  },
  appBar: {
    backgroundColor: "transparent",
    color: "#182c9c",
  },
  tabs: {
    borderRadius: 10,
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { open, handleVisibleModal } = useCryptoContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        className={classes.loginButton}
        onClick={handleVisibleModal}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleVisibleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Tabs
                variant="fullWidth"
                onChange={handleChange}
                value={value}
                className={classes.tabs}
              >
                <Tab label="Login" />
                <Tab label="Sign up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login />}
            {value === 1 && <Signup />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}