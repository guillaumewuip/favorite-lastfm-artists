
import { fromJS } from 'immutable';
import unzip from 'lodash/unzip';
import merge from 'lodash/merge';

import {
  ADD_NEW_TRACKS
} from '../actions';

const initialState = fromJS({
  artists: {},
  tracks:  [],
});

const addTracks = (state, sources) => {
  const
    artists = state.get('artists'),
    tracks  = state.get('tracks');

  const [newTracks, newArtists] = unzip(sources.map((source) => [
    {
      name:  source.name,
      mbid:  source.mbid,
      url:   source.url,
      image: source.image[3]['#text'],
    },
    {
      name: source.artist.name,
      mbid: source.artist.mbid,
      url:  source.artist.url,
    },
  ]));

  const newArtistsUniques = merge(...newArtists.map((artist) => ({
    [artist.name]: artist,
  })));

  return (state
    .set('artists', artists.mergeDeep(newArtistsUniques))
    .set('tracks', tracks.concat(newTracks))
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NEW_TRACKS:
    return addTracks(state, action.tracks);
  default:
    return state;
  }
};

export default reducer;

