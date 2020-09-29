import * as actionTypes from '../actions/action-types';

const initialState = {
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

    case actionTypes.REGISTER_USER_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.REGISTER_USER_FAILURE:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };
        
    default: return state;
  }
}

export default reducer;