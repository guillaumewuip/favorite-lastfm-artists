
import React from 'react';
import './Loader.scss';

const Loader = ({ desc }) => (
  <div className="loader">
    <div>
      <p className="loader-blink">loading ...</p>
      { desc ? <p className="loader-desc">{desc}</p> : '' }
    </div>
  </div>
);

export default Loader;
