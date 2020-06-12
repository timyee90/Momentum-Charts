import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Price from './components/currentPrice.js';
import Search from './components/Search';
import axios from 'axios';

const App = () => {
  const [ticker, setTicker] = useState('aapl');
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axios
      .get(`/ticker/${ticker}`)
      .then((data) => {
        console.log(`DATA:`, data.data[0].data.data);
        setPriceData(data.data[0].data.data);
      })
      .catch((err) => console.log(`Error fetching data: `, err));
  }, []);

  return (
    <div>
      <h1>Momentum Charts</h1>
      <Price prices={priceData} ticker={ticker} />
      <Search />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
