
import React from 'react';
import cs from 'classnames';

import './Tag.scss';

const Tag = ({ name, disabled, clickable, onClick }) => (
  <span className="tag-wrapper">
    <button
      className={cs(
        'tag',
        { 'mod-off': disabled, 'mod-clickable': clickable },
      )}
      onClick={() => (onClick ? onClick() : null)}
    >
      {name}
    </button> <span />
  </span>
);

export default Tag;
