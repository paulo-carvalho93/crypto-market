import React from 'react';
import { 
  AppBar, 
  Container, 
  MenuItem, 
  Select, 
  Toolbar, 
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useCryptoContext } from '../../CryptoContext';
import AuthModal from '../Authentication/AuthModal';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#3f51b5",
    fontFamily: "Roboto",
    fontWeight: "bold",
    cursor: "pointer",
  },
  selectCurrency: {
    width: 100,
    height: 40,
    marginRight: 15,
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency, user } = useCryptoContext();

  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography 
            variant="h6"
            className={classes.title} 
            onClick={() => history.push("/")}
          >
            Crypto Market
          </Typography>
          <Select 
            variant="outlined" 
            className={classes.selectCurrency}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="BRL">BRL</MenuItem>
          </Select>
          { user ? "Logout" : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;