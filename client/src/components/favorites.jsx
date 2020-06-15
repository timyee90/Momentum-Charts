import React, { useState } from 'react';
import FavoriteItem from './favoriteItem.jsx';

const Favorite = ({ ticker, prices, handleFavoriteClick }) => {
  const [favorites, setFavorites] = useState([]);

  const handleAdd = () => {
    const tempFav = JSON.parse(localStorage.getItem('favorites')) || [];
    if (tempFav.indexOf(ticker) === -1) tempFav.push(ticker);
    localStorage.setItem('favorites', JSON.stringify(tempFav));
    setFavorites(JSON.parse(localStorage.getItem('favorites')));
  };

  const handleRemove = (id) => {
    const tempFav = JSON.parse(localStorage.getItem('favorites')) || [];
    tempFav.splice(id, 1);
    localStorage.setItem('favorites', JSON.stringify(tempFav));
    setFavorites(JSON.parse(localStorage.getItem('favorites')));
  };

  const favesArray = JSON.parse(localStorage.getItem('favorites')) || [];
  const faves = favesArray.map((item, id) => {
    return (
      <FavoriteItem
        key={id}
        id={id}
        ticker={item}
        prices={prices}
        handleFavoriteClick={handleFavoriteClick}
        handleRemove={handleRemove}
      />
    );
  });

  return (
    <>
      <h2>Watchlist</h2>
      <button className='watchlist-add' onClick={handleAdd}>
        Add to Watchlist
      </button>
      {faves}
    </>
  );
};

export default Favorite;
