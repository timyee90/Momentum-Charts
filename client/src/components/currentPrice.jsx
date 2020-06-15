import React from 'react';

const Price = ({ prices, ticker }) => {
  const len = prices.length;
  const yesterday = prices[len - 2];
  const today = prices[len - 1];

  const closing =
    today !== undefined ? (
      <div className='prices'>
        <div>{Number(today.Close).toFixed(2)}</div>
      </div>
    ) : (
      ''
    );
  const percentChange =
    today !== undefined ? (
      today.Close - yesterday.Close > 0 ? (
        <div className='prices positive'>
          <div>
            +
            {(
              (Number(today.Close) / Number(yesterday.Close) - 1) *
              100
            ).toFixed(2)}
            %
          </div>
        </div>
      ) : (
        <div className='prices negative'>
          <div>
            {(
              (Number(today.Close) / Number(yesterday.Close) - 1) *
              100
            ).toFixed(2)}
            %
          </div>
        </div>
      )
    ) : (
      ''
    );
  const relativeChange =
    today !== undefined ? (
      today.Close - yesterday.Close > 0 ? (
        <div className='prices'>
          <div>
            +{(Number(today.Close) - Number(yesterday.Close)).toFixed(2)}
          </div>
        </div>
      ) : (
        <div className='prices'>
          <div>
            {(Number(today.Close) - Number(yesterday.Close)).toFixed(2)}
          </div>
        </div>
      )
    ) : (
      ''
    );

  const symbol = (
    <div className='prices'>
      <div>{ticker.toUpperCase()}</div>
    </div>
  );

  return (
    <div className='price-container'>
      {symbol}
      {closing}
      {relativeChange}
      {percentChange}
    </div>
  );
};

export default Price;
