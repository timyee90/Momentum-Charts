import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Price from './components/currentPrice.jsx';
import Search from './components/Search.jsx';
import Favorite from './components/favorites.jsx';
// import MainChart from './components/mainChart.jsx';
import axios from 'axios';

const App = () => {
  const [ticker, setTicker] = useState('aapl');
  const [priceData, setPriceData] = useState([]);

  const getTickerData = (symbol = ticker) => {
    return axios
      .get(`/ticker/${symbol}`)
      .catch((err) => {
        throw err;
      })
      .then(({ data }) => {
        if (data !== undefined && data.length > 0) {
          setPriceData(data);
        }
      })
      .catch((err) => {
        console.log(`Error in fetching: `, err);
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

  const handleFavoriteClick = (symbol) => {
    getTickerData(symbol)
      .catch((err) => {
        throw err;
      })
      .then(() => {
        setTicker(symbol);
      })
      .catch((err) => {
        console.log(`Error searching ticker: `, err);
      });
  };

  return (
    <div>
      <h1>Momentus</h1>
      <Price prices={priceData} ticker={ticker} />
      <Search handleSearch={handleSearch} />
      <Favorite
        ticker={ticker}
        prices={priceData}
        handleFavoriteClick={handleFavoriteClick}
      />
      {/* <MainChart prices={priceData} /> */}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
