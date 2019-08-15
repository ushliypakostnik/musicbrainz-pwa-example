export const INITIAL_STATE = {
  rootReducer: {
  },
  routing: {}
};

export const FETCH_URL = 'http://musicbrainz.org/ws/2/release/?query=type:album AND ';

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
