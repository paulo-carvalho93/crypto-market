import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useCryptoContext } from '../../CryptoContext';

const useStyles = makeStyles(() => ({
  boxContainer: {
   display: "flex",
   flexDirection: "column",
   gap: "20px",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { handleVisibleModal } = useCryptoContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {

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