import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { useCryptoContext } from '../../CryptoContext';

const Alert = () => {
  const { alert, setAlert } = useCryptoContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  }

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={10}
        variant="filled"
        severity={alert.type}
        onClose={handleClose}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert;