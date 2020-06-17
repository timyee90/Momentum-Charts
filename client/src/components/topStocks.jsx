import React from 'react';

const TopStocks = ({ stocks }) => {
  const createTable = (stocks, sign) => {
    return stocks.length > 0 ? (
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {stocks.map((item, id) => {
            return (
              <tr className='price-container' key={id}>
                <td className='prices'>{item.ticker}</td>
                <td className={`prices ${sign}`}>
                  {item.percentChange.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      ''
    );
  };

  const stockArrayBest = createTable(stocks.slice(0, 25), 'positive');
  const stockArrayWorst = createTable(
    stocks.slice(stocks.length - 25, stocks.length).reverse(),
    'negative'
  );

  return (
    <div className='performance-container'>
      <div>
        <div className='performance-sub-container'>
          <h3>25 Best Performing Stocks</h3>
        </div>
        {stockArrayBest}
      </div>
      <div>
        <div className='performance-sub-container'>
          <h3>25 Worst Performing Stocks</h3>
        </div>
        {stockArrayWorst}
      </div>
    </div>
  );
};

export default TopStocks;
