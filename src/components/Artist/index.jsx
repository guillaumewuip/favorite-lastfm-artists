
import React from 'react';
import randomColor from 'randomcolor';
import Tag from '../Tag';

import './Artist.scss';

const getRandomColor = (seed) => randomColor({
  hue:    'blue',
  count:  27,
  format: 'rgba',
  alpha:  0.8,
  seed,
});

const Image = ({ name, image, url }) => {
  const link = (<a className="artist-link" href={url} target="_blank">
    <div className="artist-link-icon">▶︎</div>
  </a>);

  if (!image) {
    return (
      <div
        className="artist-image mod-no-image"
        style={{ backgroundColor: getRandomColor(name) }}
      >
        {link}
      </div>
    );
  }

  return (
    <div
      className="artist-image"
      style={{ backgroundImage: `url(${image})` }}
    >
      {link}
    </div>
  );
};

const Artist = ({ name, image, tags, url }) => (
  <div className="artist">
    <Image image={image} name={name} url={url} />
    <div className="artist-info">
      <span className="artist-name">{name}</span>
      <div className="artist-tags">
        { tags.map((tag) => <Tag key={tag.name} name={tag.name} />) }
      </div>
    </div>
  </div>
);

export default Artist;
