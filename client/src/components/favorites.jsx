import React, { useState, useEffect } from 'react';
// import FavoriteItem from './components/favoriteItem.jsx';

const Favorite = ({ ticker }) => {
  const [favorites, setFavorites] = useState([]);

  const favesArray = JSON.parse(localStorage.getItem('favorites')) || [];
  const faves = favesArray.map((item, id) => {
    return <div key={id}>{item.toUpperCase()}</div>;
  });

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

  return (
    <>
      <h2>Watchlist</h2>
      <button onClick={handleAdd}>Add to Watchlist</button>
      {faves}
    </>
  );
};

export default Favorite;
