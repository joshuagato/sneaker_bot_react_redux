import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addProfile = profileDetails => {
  return dispatch => {
    axios.post('/addprofile', profileDetails)
    .then(() => dispatch(fetchAllProfiles()))
    .catch(() => dispatch(fetchAllProfiles()));
  };
};

const fetchAllProfilesSuccess = profiles => {
  return {
    type: actionTypes.FETCH_PROFILES_SUCCESS,
    profiles: profiles
  };
};

const fetchAllProfilesFailure = message => {
  return {
    type: actionTypes.FETCH_TASKS_FAILURE,
    message: message
  };
};

export const fetchAllProfiles = id => {
  return dispatch => {
    axios.get('/fetchalluserprofiles/' + id)
    .then(response => dispatch(fetchAllProfilesSuccess(response.data.profiles)))
    .catch(error => {
      if (error.response) dispatch(fetchAllProfilesFailure(error.response.data.message));
    });
  };
};