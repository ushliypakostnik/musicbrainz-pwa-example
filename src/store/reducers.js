import { INITIAL_STATE } from './constants';

const rootReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case 'REQUEST_ALBUM':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_ALBUM':
      return Object.assign({}, state, {
        isFetching: false,
        results: action.albums,
      });
    case 'REQUEST_ALBUM_FAILED':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}

export default rootReducer;
