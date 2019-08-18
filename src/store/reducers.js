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
        state.collection.collectionId.unshift(action.album.id);
        const collectionIdAdd = state.collection.collectionId;
        state.collection.collection.unshift(action.album);
        const collectionAdd = state.collection.collection;
        return Object.assign({}, state, {
          collection: {
            collectionId: collectionIdAdd,
            collection: collectionAdd,
          },
        });
      }
      return state;
    case 'REMOVE_ALBUM':
      const index1 = state.collection.collectionId.indexOf(action.albumId);
      let index2;
      const collectionRemoveGetIndex = state.collection.collection.map((album, index) => {
        if (album.id === action.albumId) index2 = index;
      });
      const collectionIdRemove = state.collection.collectionId;
      collectionIdRemove.splice(index1, 1);
      const collectionRemove = state.collection.collection;
      collectionRemove.splice(index2, 1);
      return Object.assign({}, state, {
        collection: {
          collectionId: collectionIdRemove,
          collection: collectionRemove,
        },
      });
    default:
      return state;
  }
}

export default rootReducer;
