
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

const Image = ({ name, image }) => {
  if (!image) {
    return (<div
      className="artist-image mod-no-image"
      style={{ backgroundColor: getRandomColor(name) }}
    />);
  }

  return (
    <div
      className="artist-image"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

const Artist = ({ name, image, tags }) => (
  <div className="artist">
    <Image image={image} name={name} />
    <div className="artist-info">
      <span className="artist-name">{name}</span>
      <div className="artist-tags">
        { tags.map((tag) => <Tag key={tag.name} name={tag.name} />) }
      </div>
    </div>
  </div>
);

export default Artist;
