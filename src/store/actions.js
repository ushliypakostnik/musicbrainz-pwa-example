import {
  FETCH_ALBUM_BY_TITLE_URL,
  FETCH_ALBUM_BY_TITLE_QUERY,
  FETCH_ALBUM_BY_ID_URL,
  FETCH_ALBUM_BY_ID_QUERY,
} from './constants';

// Actions Types

export const REQUEST_ALBUM_BY_TITLE = 'REQUEST_ALBUM_BY_TITLE';
export const RECEIVE_ALBUM_BY_TITLE = 'RECEIVE_ALBUM_BY_TITLE';
export const REQUEST_ALBUM_BY_TITLE_FAILED = 'REQUEST_ALBUM_BY_TITLE_FAILED';

export const ADD_ALBUM = 'ADD_ALBUM';
export const REMOVE_ALBUM = 'REMOVE_ALBUM';

export const REQUEST_ALBUM_BY_ID = 'REQUEST_ALBUM_BY_ID';
export const RECEIVE_ALBUM_BY_ID = 'RECEIVE_ALBUM_BY_ID';
export const REQUEST_ALBUM_BY_ID_FAILED = 'REQUEST_ALBUM_BY_ID_FAILED';

export const ERROR_CLEARING = 'ERROR_CLEARING';

// Action Creators

export const requestAlbumByTitle = () => ({
  type: REQUEST_ALBUM_BY_TITLE,
});

export const receiveAlbumByTitle = (albums) => ({
  type: RECEIVE_ALBUM_BY_TITLE,
  albums
});

export const requestAlbumByTitleFailed = (error) => ({
  type: REQUEST_ALBUM_BY_TITLE_FAILED,
  error
});

export const fetchAlbumByTitle = (title) => {
  return dispatch => {
    dispatch(requestAlbumByTitle());
    return fetch(FETCH_ALBUM_BY_TITLE_URL + title + FETCH_ALBUM_BY_TITLE_QUERY)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(receiveAlbumByTitle(result.releases));
        },
        (error) => {
          dispatch(requestAlbumByTitleFailed(error));
        }
      );
  }
};

export const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album,
});

export const removeAlbum = (albumId) => ({
  type: REMOVE_ALBUM,
  albumId,
});

export const requestAlbumById = (albumId) => ({
  type: REQUEST_ALBUM_BY_ID,
  albumId
});

export const receiveAlbumById = (album) => ({
  type: RECEIVE_ALBUM_BY_ID,
  album
});

export const requestAlbumByIdFailed = (error) => ({
  type: REQUEST_ALBUM_BY_ID_FAILED,
  error
});

export const fetchAlbumById = (albumId) => {
  return dispatch => {
    dispatch(requestAlbumById());
    return fetch(FETCH_ALBUM_BY_ID_URL + albumId + FETCH_ALBUM_BY_ID_QUERY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            dispatch(requestAlbumByIdFailed(result.error));
          } else {
            dispatch(receiveAlbumById(result));
          }
        },
        (error) => {
          dispatch(requestAlbumByIdFailed(error));
        }
      );
  }
};

export const errorClearing = () => ({
  type: ERROR_CLEARING,
});

