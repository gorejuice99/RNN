import { UI_START_LOADING, UI_STOP_LOADING } from '../actions/actionTypes';

const initial_state = {
  isLoading: false
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
