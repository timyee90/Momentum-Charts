import React from 'react';

const Price = ({ prices, ticker }) => {
  const len = prices.length;
  const yesterday = prices[len - 2];
  const today = prices[len - 1];

  const closing =
    today !== undefined ? <div>{Number(today.Close).toFixed(2)}</div> : '';
  const percentChange =
    today !== undefined ? (
      <div>
        {(Number(today.Close) / Number(yesterday.Close) - 1).toFixed(2)}%
      </div>
    ) : (
      ''
    );
  return (
    <>
      <div>{ticker.toUpperCase()}</div>
      {closing}
      {percentChange}
    </>
  );
};

export default Price;
