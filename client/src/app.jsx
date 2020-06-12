import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Price from './components/currentPrice.jsx';
import Search from './components/Search.jsx';
import Favorite from './components/favorites.jsx';
import axios from 'axios';

const App = () => {
  const [ticker, setTicker] = useState('aapl');
  const [priceData, setPriceData] = useState([]);

  const getTickerData = (symbol = ticker) => {
    return axios
      .get(`/ticker/${symbol}`)
      .then((data) => {
        // console.log(`DATA:`, data.data[0].data.data);
        console.log(`DATA:`, data);
        setPriceData(data.data[0].data.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getTickerData();
  }, []);

  const handleSearch = (newTicker) => {
    if (newTicker !== ticker && newTicker !== '') {
      getTickerData(newTicker)
        .then(() => {
          setTicker(newTicker);
        })
        .catch((err) => {
          console.log(`Error searching ticker: `, err);
        });
    }
  };

  return (
    <div>
      <h1>Momentum Charts</h1>
      <Price prices={priceData} ticker={ticker} />
      <Search handleSearch={handleSearch} />
      <Favorite ticker={ticker} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
