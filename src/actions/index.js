
export const LOAD_FAVORITE_TRACKS = 'LOAD_FAVORITE_TRACKS';
export const loadFavoriteTracks = () => ({ type: LOAD_FAVORITE_TRACKS });

export const ADD_NEW_TRACKS = 'ADD_NEW_TRACKS';
export const addNewTracks = (tracks) => ({ type: ADD_NEW_TRACKS, tracks });
