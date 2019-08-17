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
      const index1 = state.collection.collectionId.indexOf(action.album.id);
      let index2;
      const collectionRemoveGetIndex = state.collection.collection.map((album, index) => {
        if (album.id === action.album.id) index2 = index;
      });
      console.log('Индекс1: ', index1);
      console.log('Индекс2: ', index2);
      const collectionIdRemove = state.collection.collectionId;
      collectionIdRemove.splice(index1, 1);
      const collectionRemove = state.collection.collection;
      collectionRemove.splice(index2, 1);
      console.log('collectionIdRemove: ', collectionIdRemove);
      console.log('collectionRemove: ', collectionRemove);
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
