import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useCryptoContext } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: "100%",
    width: 350,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  avatar: {
    height: 38,
    width: 38,
    cursor: "pointer",
    backgroundColor: "#3f51b5",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  userPicture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#3f51b5",
    objectFit: "contain",
  },
  userName: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bolder",
    textAlign: "center",
    wordWrap: "break-word",
  },
  logoutButton: {
    height: "8%",
    width: "100%",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    overFlowY: "scroll",
  },
  watchlistText: {
    fontSize: 15,
    textShadow: "0 0 1px black",
  },
});

const UserSidebar = () => {
  const classes = useStyles();
  const { user } = useCryptoContext();
  const [positionDrawer, setPositionDrawer] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setPositionDrawer({ ...positionDrawer, [anchor]: open });
  };

  const logOut = () => {};

  return (
    <div>
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Avatar 
            className={classes.avatar}
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer anchor={anchor} open={positionDrawer[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar 
                  className={classes.userPicture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className={classes.userName}>
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span className={classes.watchlistText}>
                    Watchlist
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.logoutButton}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}

export default UserSidebar;