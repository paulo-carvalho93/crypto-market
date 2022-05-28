import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Carousel from '../Carousel/Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 400,
    paddingTop: 25,
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "40%",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    fontFamily: "Roboto",
    textTransform: "capitalize",
    color: "#fff",
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography className={classes.title} variant="h2">
            Crypto Market
          </Typography>
          <Typography className={classes.description} variant="subtitle2">
            All Crypto Currency Market in just one place!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
};

export default Banner;