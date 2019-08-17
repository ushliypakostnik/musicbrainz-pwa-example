export const INITIAL_STATE = {
  rootReducer: {
    isFetching: false,
    results: [],
    collection: {
      collectionId: [],
      collection: [],
    },
  },
  routing: {}
};

export const FETCH_ALBUM_BY_TITLE_URL = 'http://musicbrainz.org/ws/2/release/?limit=100&query=type:album AND ';

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
  search1: 'No albums found',
};
