
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import {
  LOAD_FAVORITE_TRACKS,
  addNewTracks,
  addNewArtistInfo
} from '../actions';

export const getFavoritesTracks = (client) => (userId, page = 1) => client
  .getFavoritesTracks(userId, page)
  .mergeMap((response) => {
    const
      tracks      = response.lovedtracks.track,
      currentPage = parseInt(response.lovedtracks['@attr'].page, 10),
      totalPage   = parseInt(response.lovedtracks['@attr'].totalPages, 10);

    const result$ = Observable.from([tracks]);

    return result$.concat(
      currentPage >= totalPage
        ? Observable.empty()
        : getFavoritesTracks(client)(userId, page + 1)
    );
  });

export const getArtistInfo = (client) => (name, mbid, userId = '') => client
  .getArtistInfo(
    name,
    mbid,
    userId
  );

export const LOAD_FAVORITE_TRACKS_SUCCESS = 'LOAD_FAVORITE_TRACKS_SUCCESS';
export const loadFavoriteTracksOnInitEpics = (action$, store, { lastFM }) =>
  action$
    .ofType(LOAD_FAVORITE_TRACKS)
    .map(() => store.getState().get('user'))
    .mergeMap((user) => getFavoritesTracks(lastFM)(user)
      .filter((result) => !!result)
      .map(addNewTracks)
      .concat(Observable.of({ type: LOAD_FAVORITE_TRACKS_SUCCESS }))
    );

export const LOAD_FAVORITE_ARTISTS_SUCCESS = 'LOAD_FAVORITE_ARTISTS_SUCCESS';
export const loadFavoriteArtistsInfo = (action$, store, { lastFM }) =>
  action$
    .ofType(LOAD_FAVORITE_TRACKS_SUCCESS)
    .map(() => ({
      artists: store.getState().get('artists'),
      user:    store.getState().get('user'),
    }))
    .mergeMap(({ artists, user }) => Observable.concat(
      Observable
        .from(artists.toArray())
        .mergeMap(
          (artist) => getArtistInfo(lastFM)(
            artist.get('name'),
            artist.get('mbid'),
            user
          // don't break stream if unknown artist
          ).catch(() => Observable.empty())
        )
        .map(addNewArtistInfo),
      Observable.of({ type: LOAD_FAVORITE_ARTISTS_SUCCESS })
    ));

export default combineEpics(
  loadFavoriteTracksOnInitEpics,
  loadFavoriteArtistsInfo
);
