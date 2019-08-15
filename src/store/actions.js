import { FETCH_ALBUM_BY_TITLE_URL } from './constants';

// Actions Types

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const REQUEST_ALBUM_FAILED = 'REQUEST_ALBUM_FAILED';

// Action Creators

export const requestAlbum = () => ({
  type: REQUEST_ALBUM
});

export const receiveAlbum = (albums) => ({
  type: RECEIVE_ALBUM,
  albums
});

export const requestAlbumFailed = (error) => ({
  type: REQUEST_ALBUM_FAILED,
  error
});

export const fetchAlbumByTitle = (title) => {
  return dispatch => {
    dispatch(requestAlbum());
    return fetch(FETCH_ALBUM_BY_TITLE_URL + title + '&fmt=json')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.releases);
          dispatch(receiveAlbum(result.releases));
        },
        (error) => {
          console.log(error);
          dispatch(requestAlbumFailed(error));
        }
      );
  }
};
