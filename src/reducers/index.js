
import { fromJS } from 'immutable';
import unzip from 'lodash/unzip';
import merge from 'lodash/merge';

import {
  ADD_NEW_TRACKS,
  ADD_NEW_ARTIST_INFO,
} from '../actions';

import {
  LOAD_FAVORITE_TRACKS_SUCCESS,
  LOAD_FAVORITE_ARTISTS_SUCCESS,
} from '../epics/api';

const initialState = fromJS({
  loadingTracks: true,
  loadingInfos:  true,
  artists:       {},
  tracks:        [],
  tags:          {},
});

const addTracks = (state, sources) => {
  const
    artists = state.get('artists'),
    tracks  = state.get('tracks');

  const [newTracks, newArtists] = unzip(sources.map((source) => [
    {
      name:   source.name,
      mbid:   source.mbid,
      url:    source.url,
      image:  source.image[3]['#text'],
      artist: source.artist.name,
    },
    {
      name:        source.artist.name,
      mbid:        source.artist.mbid,
      url:         source.artist.url,
      tags:        [],
      occurrences: 0,
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

const countArtistsOccurences = (state) => {
  const
    tracks  = state.get('tracks'),
    artists = state.get('artists');

  const occurrences = tracks.countBy((track) => track.artist);

  return (state
    .set('artists', artists.map((artist) => artist.set(
      'occurrences',
      occurrences.get(artist.get('name'))
    )))
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NEW_TRACKS:
    return addTracks(state, action.tracks);
  case ADD_NEW_ARTIST_INFO:
    return addArtistInfo(state, action.artist, action.info);
  case LOAD_FAVORITE_TRACKS_SUCCESS:
    return countArtistsOccurences(state).set('loadingTracks', false);
  case LOAD_FAVORITE_ARTISTS_SUCCESS:
    return state.set('loadingInfos', false);
  default:
    return state;
  }
};

export default reducer;

