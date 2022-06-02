import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

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