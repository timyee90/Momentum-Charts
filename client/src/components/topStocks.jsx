import React from 'react';

const TopStocks = ({ stocks }) => {
  const stockArrayBest =
    stocks.length > 0
      ? stocks.slice(0, 25).map((item, id) => {
          return (
            <div className='price-container' key={id}>
              <div className='prices'>{item.ticker}</div>
              <div className='prices positive'>
                {item.percentChange.toFixed(2)}%
              </div>
            </div>
          );
        })
      : '';

  const stockArrayWorst =
    stocks.length > 0
      ? stocks
          .slice(stocks.length - 25, stocks.length)
          .reverse()
          .map((item, id) => {
            return (
              <div className='price-container' key={id}>
                <div className='prices'>{item.ticker}</div>
                <div className='prices negative'>
                  {item.percentChange.toFixed(2)}%
                </div>
              </div>
            );
          })
      : '';

  return (
    <div>
      <h2>25 Best Performing Stocks</h2>
      {stockArrayBest}
      <h2>25 Worst Performing Stocks</h2>
      {stockArrayWorst}
    </div>
  );
};

export default TopStocks;
