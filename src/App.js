import { BrowserRouter, Route} from 'react-router-dom'

import { makeStyles } from '@material-ui/core';

import './App.css';

import Header from './components/Header/Header';
import CoinPage from './pages/CoinPage';
import Homepage from './pages/Homepage';
import Alert from './components/Alert/Alert';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#FFF",
      color: "white",
      minHeight: "100vh",
    }
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Alert />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
