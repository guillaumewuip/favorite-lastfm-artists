
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import Rx from 'rxjs';

const API_KEY = '5a95a0ce3ef544f937afd572ae8ed901';
const API_ROOT = 'http://ws.audioscrobbler.com/2.0/';

const getFavoritesSongsPage = (userId, page = 1, limit = 100) => {
  const query = queryString.stringify({
    method:  'user.getlovedtracks',
    user:    userId,
    api_key: API_KEY,
    format:  'json',
    limit,
    page
  });

  return Rx.Observable.create((observer) => {
    fetch(`${API_ROOT}?${query}`)
      .then((response) => {
        console.log('ok');
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((result) => observer.next(result));
  });
};

const getFavoritesSongs = (userId) => {
  return getFavoritesSongsPage(userId)
    .flatMap((response) => {
      const result = Rx.Observable.fromObject(response);
      console.log(result);
      return 'toto';
    });
};

getFavoritesSongs('guillaumewuip');

