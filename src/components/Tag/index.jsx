
import React from 'react';
import cs from 'classnames';

import './Tag.scss';

const Tag = ({ name, size = 'normal' }) => (
  <span className="tag-wrapper">
    <span className={cs('tag', `mod-${size}`)}>{name}</span> <span />
  </span>
);

export default Tag;
