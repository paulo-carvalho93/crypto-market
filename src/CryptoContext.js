import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

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

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
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