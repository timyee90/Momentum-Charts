import React from 'react';

const FavoriteItem = ({ id, ticker, handleFavoriteClick, handleRemove }) => {
  return (
    <>
      <div onClick={() => handleFavoriteClick(ticker)}>
        <div>{ticker.toUpperCase()}</div>
      </div>
      <button onClick={() => handleRemove(id)}>
        <span>Remove</span>
      </button>
    </>
  );
};

export default FavoriteItem;
