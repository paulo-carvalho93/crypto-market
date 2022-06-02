import React, { useState } from 'react';
import { useCryptoContext } from '../../CryptoContext';
import { makeStyles } from '@material-ui/core/styles';
import { 
  CircularProgress, 
  Modal, 
  Backdrop, 
  Fade, 
  Button, 
  AppBar, 
  Tabs, 
  Tab, 
  Box,
} from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

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
  },
  googleAuth: {
    display: "flex",
    flexDirection: "column",
    fotSize: 20,
    textAlign: "center",
    gap: 20,
    padding: 24,
    paddingTop: 0,
  }
}));

const AuthModal = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { open, handleVisibleModal, setAlert } = useCryptoContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then(res => {
      setAlert({
        open: true,
        message: `Sign up Successfull. Welcome ${res.user.email}`,
        type: "success",
      });

      handleVisibleModal();
    }).catch((error) => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    });
  };

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        className={classes.loginButton}
        onClick={handleVisibleModal}
      >
        {auth.currentUser === null ? "Login" : <CircularProgress size={20} color="#3f51b5" />}
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

            <Box className={classes.googleAuth}>
              <span style={{ color: "#182c9c" }}>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none"}}
                onClick={signInWithGoogle}
              />
            </Box>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal;