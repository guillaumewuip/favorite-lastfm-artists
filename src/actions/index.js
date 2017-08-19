
export const LOAD_FAVORITE_TRACKS = 'LOAD_FAVORITE_TRACKS';
export const loadFavoriteTracks = () => ({ type: LOAD_FAVORITE_TRACKS });

export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const addNewTrack = (track) => ({ type: ADD_NEW_TRACK, track });
