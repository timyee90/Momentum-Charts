import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  return (
    <>
      <input placeholder='ticker lookup' onChange={handleChange} />
      <button onClick={() => handleSearch(searchTerm)}>Submit</button>
    </>
  );
};

export default Search;
