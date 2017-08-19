
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import {
  LOAD_FAVORITE_TRACKS,
  addNewTrack
} from '../actions';

export const getFavoritesTracks = (client) => (userId, page = 1) => (
  client.getFavoritesTracks(userId, page)
    .flatMap((response) => {
      const
        tracks      = response.lovedtracks.track,
        currentPage = response.lovedtracks['@attr'].page,
        totalPage = response.lovedtracks['@attr'].totalPages;

      const result$ = Observable.from(tracks);

      return result$.concat(
        currentPage >= totalPage
          ? Observable.empty()
          : getFavoritesTracks(userId, page + 1)
      );
    })
);

export const LOAD_FAVORITE_TRACKS_SUCCESS = 'LOAD_FAVORITE_TRACKS_SUCCESS';
export const loadFavoriteTracksOnInitEpics = (action$, store, { lastFM }) =>
  action$
    .ofType(LOAD_FAVORITE_TRACKS)
    .flatMap(() => getFavoritesTracks(lastFM)('guillaumewuip')
      .map(addNewTrack)
      .concat(Observable.of({ type: LOAD_FAVORITE_TRACKS_SUCCESS }))
    );

export default combineEpics(
  loadFavoriteTracksOnInitEpics
);
