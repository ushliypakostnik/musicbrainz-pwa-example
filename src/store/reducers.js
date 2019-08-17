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
      if (state.collection.collectionId.indexOf(action.album.id) === -1) {
        const collectionIdAdd = state.collection.collectionId.concat(action.album.id);
        const collectionAdd = state.collection.collection.concat(action.album);
        return Object.assign({}, state, {
          collection: {
            collectionId: collectionIdAdd,
            collection: collectionAdd,
          },
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
