
import { Observable } from 'rxjs';
import Api from './api';

const API_KEY = '5a95a0ce3ef544f937afd572ae8ed901';
const client = Api(API_KEY);

const USER_NAME = 'guillaumewuip';

// Logic

const getFavoritesSongs = (userId, page = 1) => (
  client.getFavoritesSongs(userId, page)
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
    client.getArtistInfo(
      artist.name,
      artist.mbid,
      USER_NAME
    )
    // don't break stream if unknown artist
    .catch(() => Observable.empty())
  ))
  .subscribe(
    (desc) => {
      console.log(desc);
    },
    (err) => console.error(err),
    () => {}
  );

