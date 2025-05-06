import { useState, useEffect } from 'react';
import axios from 'axios';

const useExchangeRate = (baseCurrency, targetCurrency) => {
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      setExchangeRate(response.data.rates[targetCurrency]);
    };
    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  return exchangeRate;
};

export default useExchangeRate;

