import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { CoinList } from './config/api';

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

  const handleVisibleModal = () => {
    setOpen(!open);
  };

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