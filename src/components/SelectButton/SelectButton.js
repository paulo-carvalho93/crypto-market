import React from 'react';
import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles(() => ({
    selectButton: {
      width: "22%",
      border: "2px solid #3f51b5",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Roboto",
      fontWeight: selected ? 700 : 400,
      cursor: "pointer",
      backgroundColor: selected ? "#3f51b5" : "",
      color: selected ? "white" : "black",
      transition: "0.3s",
      "&:hover" : {
        backgroundColor: "#3f51b5",
        color: "white",
        opacity: 1,
      },
    },
  }));

  const classes = useStyles();
  return (
    <span 
      className={classes.selectButton}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default SelectButton;