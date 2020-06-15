import React, { useState, useEffect } from 'react';
import Price from './currentPrice.jsx';
import axios from 'axios';

const FavoriteItem = ({ id, ticker, handleFavoriteClick, handleRemove }) => {
  const [priceData, setPriceData] = useState([]);

  const getTickerData = (symbol = ticker) => {
    return axios
      .get(`/ticker/${symbol}`)
      .catch((err) => {
        throw err;
      })
      .then(({ data }) => {
        if (data !== undefined && data.data.data.length > 0) {
          setPriceData(data.data.data);
        }
      })
      .catch((err) => {
        console.log(`Error in fetching: `, err);
        throw err;
      });
  };

  useEffect(() => {
    getTickerData(ticker);
  }, []);

  const prices =
    priceData.length > 0 ? (
      <div onClick={() => handleFavoriteClick(ticker)}>
        <Price prices={priceData} ticker={ticker} />
      </div>
    ) : (
      ''
    );

  return (
    <div className='price-container'>
      {prices}
      <button onClick={() => handleRemove(id)}>
        <span>Remove</span>
      </button>
    </div>
  );
};

export default FavoriteItem;
