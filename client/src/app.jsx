import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Price from './components/currentPrice.jsx';
import Search from './components/Search.jsx';
import Favorite from './components/favorites.jsx';
import TopStocks from './components/topStocks.jsx';
// import MainChart from './components/mainChart.jsx';
import axios from 'axios';

const App = () => {
  const [ticker, setTicker] = useState('aapl');
  const [priceData, setPriceData] = useState([]);
  const [stockPerformance, setStockPerformance] = useState([]);

  const getTickerData = (symbol = ticker) => {
    return axios
      .get(`/ticker/${symbol}`)
      .catch((err) => {
        throw err;
      })
      .then(({ data }) => {
        if (data.data !== undefined && data.data.data.length > 0) {
          setPriceData(data.data.data);
          setTicker(symbol);
        }
      })
      .catch((err) => {
        console.log(`Error in fetching: `, err);
        throw err;
      });
  };

  const getAnalysis = () => {
    return axios
      .get(`/top25/`)
      .then(({ data }) => {
        const dataClean = data.filter((item) => {
          if (item !== null) return item;
        });
        setStockPerformance(dataClean);
      })
      .catch((err) => {
        console.log(`Error in fetching: `, err);
      });
  };

  useEffect(() => {
    getTickerData();
    getAnalysis();
  }, []);

  const handleSearch = (newTicker) => {
    if (newTicker !== ticker && newTicker !== '') {
      getTickerData(newTicker).catch((err) => {
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
      <TopStocks stocks={stockPerformance} />
      {/* <MainChart prices={priceData} /> */}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
