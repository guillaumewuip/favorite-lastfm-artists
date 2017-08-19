
import { fromJS } from 'immutable';
import unzip from 'lodash/unzip';
import merge from 'lodash/merge';

import {
  ADD_NEW_TRACKS,
  ADD_NEW_ARTIST_INFO
} from '../actions';

const initialState = fromJS({
  artists: {},
  tracks:  [],
  tags:    {},
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

const addArtistInfo = (state, name, info) => {
  const
    artist = state.getIn(['artists', name]),
    tags   = state.get('tags');

  const newTags = merge(...info.tags.tag.map((tag) => ({
    [tag.name]: {
      name:        tag.name,
      url:         tag.url,
      occurrences: (tags.get(tag.name)
        ? tags.get(tag.name).get('occurrences') + 1
        : 1),
    },
  })));

  return (state
    .setIn(['artists', name], artist.merge({
      image: info.image[3]['#text'],
      tags:  info.tags.tag,
    }))
    .set('tags', tags.merge(newTags))
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NEW_TRACKS:
    return addTracks(state, action.tracks);
  case ADD_NEW_ARTIST_INFO:
    return addArtistInfo(state, action.artist, action.info);
  default:
    return state;
  }
};

export default reducer;

