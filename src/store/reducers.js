import { INITIAL_STATE } from './constants';

const rootReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;
