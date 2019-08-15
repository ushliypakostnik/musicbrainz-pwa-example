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

function configureStore(state) {
  return createStore(
    combineReducers({
      rootReducer,
      routing: routerReducer
    }),
    state,
    applyMiddleware(...middlewares)
  );
}

const store = configureStore(INITIAL_STATE);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
