import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useCryptoContext } from '../../CryptoContext';
import { auth } from '../../firebase';

const useStyles = makeStyles(() => ({
  boxContainer: {
   display: "flex",
   flexDirection: "column",
   gap: "20px",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { handleVisibleModal, setAlert } = useCryptoContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const validatePassword = () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
  }

  const handleSubmit = async () => {
    validatePassword();

    try {
      const result = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      setAlert({
        open: true,
        message: `Sign Up sucessfully. Welcome ${result.user.email}`,
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
      <TextField 
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default Signup;