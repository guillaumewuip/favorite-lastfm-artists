
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { Observable } from 'rxjs';

const API_ROOT = 'http://ws.audioscrobbler.com/2.0/';

const getFavoritesSongs = (apiKey) => (userId, page = 1, limit = 100) => {
  const query = queryString.stringify({
    method:  'user.getlovedtracks',
    user:    userId,
    api_key: apiKey,
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

const getArtistInfo = (apiKey) => (name, mbid, username = undefined, lang = 'en') => {
  const query = queryString.stringify({
    method:  'artist.getInfo',
    name,
    mbid,
    lang,
    username,
    api_key: apiKey,
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

export const Api = (apiKey) => ({
  getFavoritesSongs: getFavoritesSongs(apiKey),
  getArtistInfo:     getArtistInfo(apiKey),
});

export default const lastFMClient = LastFM(LASTFM_API_KEY);
