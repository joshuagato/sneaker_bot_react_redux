import * as actionTypes from './actionTypes';
import axios from 'axios';

// Actions for Registration
const registrationSuccess = message => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    message: message
  };
}

const registrationSuccessWithWarning = message => {
  return {
    type: actionTypes.REGISTER_SUCCESS_WITH_WARNING,
    message: message
  };
}

const registrationFailure = message => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    message: message
  };
}

export const register = userInput => {
  return dispatch => {
    axios.post('/register', userInput).then(response => {
      const message = response.data.message;
      const success = response.data.success;

      success ? dispatch(registrationSuccess(message)) : dispatch(registrationSuccessWithWarning(message));
    })
    .catch(error => {
      if (error.response) dispatch(registrationFailure(error.response.data.message));
    });
  };
}
// End of Actions for Registration