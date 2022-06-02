import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box, Button, makeStyles, TextField } from '@material-ui/core';

import { auth } from '../../firebase';
import { useCryptoContext } from '../../CryptoContext';

const useStyles = makeStyles(() => ({
  boxContainer: {
   display: "flex",
   flexDirection: "column",
   gap: "20px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { handleVisibleModal, setAlert } = useCryptoContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmailOrPassword = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
  }

  const handleSubmit = async () => {
    validateEmailOrPassword();

    try {
      const result = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      setAlert({
        open: true,
        message: `Login sucessfully! Welcome ${result.user.email}`,
        type: "success",
      });

      handleVisibleModal();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box p={3} className={classes.boxContainer}>
      <TextField 
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField 
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login;