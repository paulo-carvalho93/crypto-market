/* eslint-disable array-callback-return */
import React, { Fragment, useState } from 'react';
import { signOut } from 'firebase/auth';

import { Avatar, Drawer, Button, makeStyles } from '@material-ui/core';
import { AiFillDelete } from 'react-icons/ai';
import { useCryptoContext } from '../../CryptoContext';

import { numberWithCommas } from '../../utils/numberWithCommas';
import { doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../../firebase';

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
  coins: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 0 2px black",
    borderRadius: 5,
    color: "#3f51b5",
    fontWeight: "bolder",
  },
});

const UserSidebar = () => {
  const classes = useStyles();
  const { user, watchlist, coins, symbol, setAlert} = useCryptoContext();
  const [positionDrawer, setPositionDrawer] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setPositionDrawer({ ...positionDrawer, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logout Successful !",
      type: "success",
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinReference = doc(database, "watchlist", user.uid);

    try {
      await setDoc(coinReference, 
        { coins: watchlist.filter((watch) => watch !== coin?.id)}, 
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

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
                  {coins.map(coin => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coins}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer "}}
                              fontSize="18"
                              onClick={() => removeFromWatchlist(coin)} 
                            />
                          </span>
                        </div>
                      );
                  })}
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