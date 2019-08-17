import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { INITIAL_STATE } from './constants';
import rootReducer from './reducers';

const middlewares = [];
middlewares.push(thunkMiddleware)

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();

  middlewares.push(loggerMiddleware);
}

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem('localCollection', JSON.stringify(
        getState().rootReducer.collection
    ));
    return result;
  };
};
middlewares.push(localStorageMiddleware);

const reHydrateStore = (state) => {
  console.log('AAAAAAAAAAAAA', state);
  let localCollection;
  if (localStorage.getItem('localCollection') !== null) {
    localCollection = JSON.parse(localStorage.getItem('localCollection'));
  }
  const _state = Object.assign({}, state, {
    rootReducer: {
      collection: localCollection,
    }
  });
  console.log('BBBBBBBBBBBB', _state);
  return _state;
};

function configureStore(state) {
  return createStore(
    combineReducers({
      rootReducer,
      routing: routerReducer
    }),
    reHydrateStore(state),
    applyMiddleware(...middlewares)
  );
}

const store = configureStore(INITIAL_STATE);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
