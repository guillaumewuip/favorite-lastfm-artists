
'use strict';

import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { Observable } from 'rxjs';

const API_KEY = '5a95a0ce3ef544f937afd572ae8ed901';
const API_ROOT = 'http://ws.audioscrobbler.com/2.0/';

const USER_NAME = 'guillaumewuip';

// API

const getFavoritesSongsPage = (userId, page = 1, limit = 100) => {
  const query = queryString.stringify({
    method:  'user.getlovedtracks',
    user:    userId,
    api_key: API_KEY,
    format:  'json',
    limit,
    page,
  });

  return Observable.fromPromise(
    fetch(`${API_ROOT}?${query}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((body) => {
        if (body.error) {
          throw new Error(body.message);
        }
        return body;
      })
  );
};

const getArtistInfo = (name, mbid, username = undefined, lang = 'en') => {
  const query = queryString.stringify({
    method:  'artist.getInfo',
    name,
    mbid,
    lang,
    username,
    api_key: API_KEY,
    format:  'json',
  });

  return Observable.fromPromise(
    fetch(`${API_ROOT}?${query}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((body) => {
        if (body.error) {
          throw new Error(body.message);
        }
        return body;
      })
  );
};

// Logic

const getFavoritesSongs = (userId, page = 1) => (
  getFavoritesSongsPage(userId, page)
    .flatMap((response) => {
      const
        tracks      = response.lovedtracks.track,
        currentPage = response.lovedtracks['@attr'].page,
        totalPage = response.lovedtracks['@attr'].totalPages;

      const result$ = Observable.from(tracks);

      return result$.concat(
        currentPage >= totalPage
          ? Observable.empty()
          : getFavoritesSongs(userId, page + 1)
      );
    })
);

const getArtistFromSong = (song) => song.artist;

getFavoritesSongs(USER_NAME)
  .map(getArtistFromSong)
  .filter((artist) => artist.url)
  .distinct((artist) => artist.url)
  .flatMap((artist) => (
    getArtistInfo(
      artist.name,
      artist.mbid,
      USER_NAME
    )
    .catch(() => Observable.empty())
  ))
  .subscribe(
    (desc) => {
      console.log(desc);
    },
    (err) => console.error(err),
    () => {}
  );

