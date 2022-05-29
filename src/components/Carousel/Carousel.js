/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCryptoContext } from '../../CryptoContext';

import { makeStyles } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';

import { TrendingCoins } from '../../config/api';
import { numberWithCommas } from '../../utils/numberWithCommas';

const useStyles = makeStyles(() => ({
  carousel: {
    display: "flex",
    alignItems: "center",
    height: "50%",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#FFF",
  },
  carouselImgItem: {
    height: 50,
    marginBottom: 10,
  },
  carouselCoinPrice: {
    fontSize: 22,
    fontWeight: 400,
  }
}));

const Carousel = () => {
  const { currency, symbol } = useCryptoContext();
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const responsiveControlCarousel = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  
  const fetchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrandingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          className={classes.carouselImgItem}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span 
            style={{
              color: profit > 0 ? "#0ecb81" : "red",
              fontWeight: 700,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span className={classes.carouselCoinPrice}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsiveControlCarousel}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel;