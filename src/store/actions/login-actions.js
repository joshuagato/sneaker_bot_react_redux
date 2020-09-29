import * as actionTypes from './actionTypes';
import axios from 'axios';

const loginSuccess = response => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: response.token,
    user: response.user
  };
}

const loginSuccessWithWarning = message => {
  return {
    type: actionTypes.LOGIN_SUCCESS_WITH_WARNING,
    message: message
  };
}

const loginFailure = message => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    message: message
  };
}

export const login = userInput => {
  return dispatch => {    
    return new Promise((resolve, reject) => {
      axios.post('/login', userInput).then(response => {
        if (response.data.success) {
          dispatch(loginSuccess(response.data));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // localStorage.setItem('token', JSON.stringify(response.data.token));
          resolve(true);
        }
        else {
          dispatch(loginSuccessWithWarning(response.data.message))
          reject(false);
        }
      })
      .catch(error => {
        if (error.response) dispatch(loginFailure(error.response.data.message));
      });
    })
  };
};

export const logout = () => {
  return dispatch => {
    return new Promise(honour => {
      dispatch(logoutSuccess());
      clearStorage();
      honour(true);
    });
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT
  };
}

const clearStorage = () => {
  localStorage.removeItem('user');
  // localStorage.removeItem('token');
  localStorage.clear();
}