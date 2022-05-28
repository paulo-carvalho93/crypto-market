import React from 'react';
import { 
  AppBar, 
  Container, 
  MenuItem, 
  Select, 
  Toolbar, 
  Typography,
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#fff",
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

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
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
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header;