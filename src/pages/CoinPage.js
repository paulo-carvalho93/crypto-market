/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useCryptoContext } from '../CryptoContext';
import { doc, setDoc } from 'firebase/firestore';

import { LinearProgress, makeStyles, Typography, Button } from '@material-ui/core';

import { SingleCoin } from '../config/api';
import { numberWithCommas } from '../utils/numberWithCommas';
import CoinInfo from '../components/CoinInfo/CoinInfo';
import { database } from '../firebase';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  imgCoin: {
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3f51b5",
  },
  description: {
    width: "100%",
    fontFamily: "Roboto",
    textAlign: "justify",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    color: "#212121",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    color: "#212121",
    // Responsive
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
  linearProgress: {
    backgroundColor: "#3f51b5",
  },
  watchlistAddButton: {
    width: "100%",
    height: 40,
  }
}));

const CoinPage = () => {
  const classes = useStyles();
  const { currency, symbol, user, watchlist, setAlert } = useCryptoContext();
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch(err) {
      console.log('Oops! Something went wrong!', err);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinReference = doc(database, "watchlist", user.uid);

    try {
      await setDoc(coinReference, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id]
      });

      setAlert({
        open: true,
        message: `${coin.name} added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
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

  if (!coin) return <LinearProgress className={classes.linearProgress} />

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          className={classes.imgCoin}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp; 
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price: 
            </Typography>
            &nbsp; &nbsp; 
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap: {" "}
            </Typography>
            &nbsp; &nbsp; 
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
              )}
            </Typography>
          </span>

          {user && (
            <Button
              variant="contained"
              color="primary"
              className={classes.watchlistAddButton}
              style={{ backgroundColor: inWatchlist ? "#db3b3b" : "#3f51b5" }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;