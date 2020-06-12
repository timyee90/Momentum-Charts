import React, { useState } from 'react';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <input placeholder='ticker lookup' onChange={() => {}} />
    </>
  );
};

export default Search;
