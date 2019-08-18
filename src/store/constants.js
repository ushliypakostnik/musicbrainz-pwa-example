export const INITIAL_STATE = {
  rootReducer: {
    isFetching: false,
    results: [],
    collection: {
      collectionId: [],
      collection: [],
    },
    error: [],
  },
  routing: {}
};

export const FETCH_ALBUM_BY_TITLE_URL = 'http://musicbrainz.org/ws/2/release/?limit=100&query=type:album AND ';
export const FETCH_ALBUM_BY_TITLE_QUERY = '&fmt=json';
export const FETCH_ALBUM_BY_ID_URL =  'http://musicbrainz.org/ws/2/release/';
export const FETCH_ALBUM_BY_ID_QUERY =  '?inc=artist-credits+labels+discids+recordings&fmt=json';

export const PAGES = [
  {
    path: '/search',
    aria: 'Search albums',
    title: 'Search',
  },
  {
    path: '/collection',
    aria: 'Your collection',
    title: 'Collection',
  }
];

export const ALERTS = {
  searchError: {
    type: 'error',
    message: 'No albums with this name found.',
  },
  collectionRemoveError: {
    type: 'error',
    message: 'There is no such album in the collection.',
  },
  collectionRemoveSuccess: {
    type: 'success',
    message: 'Album with this id removed from collection.',
  },
  collectionAddInfoAlready: {
    type: 'info',
    message: 'An album with this id has already been added to the collection.',
  },
  collectionAddSuccess: {
    type: 'success',
    message: 'An album with this id has been added to the collection.',
  },
  collectionAddErrorInvalid: {
    type: 'error',
    message: 'Could not find album with this id.',
  },
};
