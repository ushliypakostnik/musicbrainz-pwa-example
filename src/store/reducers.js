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
    case 'ADD_ALBUM':
      const indexTest = state.collectionId.indexOf(action.album.id);
      if (indexTest === -1) {
        const collectionAdd = state.collection.concat(action.album);
        const collectionIdAdd = state.collectionId.concat(action.album.id);
        return Object.assign({}, state, {
          collection: collectionAdd,
          collectionId: collectionIdAdd,
        });
      }
      return state;
    case 'REMOVE_ALBUM':
      const index = state.collection.indexOf(action.album);
      const collectionRemove = state.collection.splice(index, 1);
      return Object.assign({}, state, {
        collection: collectionRemove,
      });
    default:
      return state;
  }
}

export default rootReducer;
