import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  successMessage: '',
  failureMessage: '',
  // token: '',
  // user: {}
  // token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.token, user: action.user };

    case actionTypes.LOGIN_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, loading: false, failureMessage: action.message, successMessage: '' };

    case actionTypes.LOGOUT:
      return { ...state, loading: false, failureMessage: '', successMessage: '', token: null,
      user: {} };

    default: return state;
  }
}

export default reducer;