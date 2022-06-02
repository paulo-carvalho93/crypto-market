import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { doc, onSnapshot } from 'firebase/firestore';

import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]= useState({
    open: false,
    message: "",
    type: "sucess",
  });
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);

  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const handleVisibleModal = () => {
    setOpen(!open);
  };

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch(err) {
      console.log('Oops! Something went wrong!', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "BRL") setSymbol("R$");
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth,  user => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);


  // Get data from database to check if user has already some Crypto saved in Watchlist
  useEffect(() => {
    if (user) {
      const coinReference = doc(database, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinReference, coin => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log('Oops! No items in Watchlist!');
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        open,
        alert,
        setAlert,
        user,
        watchlist,
        handleVisibleModal,
        fetchCoins,
      }}
    >
      {children}
    </Crypto.Provider>
  )
};

export default CryptoContext;

export const useCryptoContext = () => {
  return useContext(Crypto);
};