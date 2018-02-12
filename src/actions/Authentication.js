import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';

// Resister
export function registerRequest(username, password) {
  return (dispatch) => {
    // Inform Api Start
    dispatch(register());

    return axios.post('/api/account/signup', {username, password})
    .then(
      (response) => {
        //SUCCEED
        dispatch(registerSuccess(username));
      }
    ).catch(
      (error) => {
        // FAILED
        dispatch(registerFailure());
      }
    );

  };
}


export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure() {
  return {
    type: AUTH_REGISTER_FAILURE
  };
}

// Login
export function loginRequest(username, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return axios.post('/api/account/signin', { username, password } )
    .then(
      (response) => {
        //SUCCEED
        dispatch(loginSuccess(username));
      }
    ).catch(
      (error) => {
        // FAILED
        dispatch(loginFailure());
      }
    );
  };
 }


export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}
