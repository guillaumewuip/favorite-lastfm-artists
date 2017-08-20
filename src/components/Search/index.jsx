
import React from 'react';

import './Search.scss';

const Search = ({ onChange }) => (
  <input
    className="search"
    onChange={(event) => onChange(event.target.value)}
  />
);

export default Search;
