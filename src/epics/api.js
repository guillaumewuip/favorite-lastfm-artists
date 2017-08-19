
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import {
  LOAD_FAVORITE_TRACKS,
  addNewTracks
} from '../actions';

export const getFavoritesTracks = (client) => (userId, page = 1) => (
  client.getFavoritesTracks(userId, page)
    .flatMap((response) => {
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
    })
);

export const LOAD_FAVORITE_TRACKS_SUCCESS = 'LOAD_FAVORITE_TRACKS_SUCCESS';
export const loadFavoriteTracksOnInitEpics = (action$, store, { lastFM }) =>
  action$
    .ofType(LOAD_FAVORITE_TRACKS)
    .flatMap(() => getFavoritesTracks(lastFM)('guillaumewuip')
      .filter((result) => !!result)
      .map(addNewTracks)
      .concat(Observable.of({ type: LOAD_FAVORITE_TRACKS_SUCCESS }))
    );

export default combineEpics(
  loadFavoriteTracksOnInitEpics
);
