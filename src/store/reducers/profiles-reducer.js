import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profiles: [],
  loading: false,
  failureMessage: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PROFILES_START:
      return { ...state, loading: true };

    case actionTypes.FETCH_PROFILES_SUCCESS:
      return { ...state, profiles: action.profiles, loading: false };
      
    case actionTypes.FETCH_PROFILES_FAILURE:
      return { ...state, loading: false, failureMessage: action.message };

    default: return state;
  }
};

export default reducer;