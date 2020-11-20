import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED} from '../types';

import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({type: CLEAR_ERRORS});
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios.post('/signup', newUserData)
          .then(res => {
              setAuthorizationHeader(res.data.token);
              dispatch(getUserData());
              dispatch({type: CLEAR_ERRORS});
              history.push('/');
          })
          .catch(err => {
              dispatch({
                  type: SET_ERRORS,
                  payload: err.response.data
              })
          })
}



//calls to the user collection and gets the user data where
//its is equal to the user id
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};


//for the user to post data in the database their post request needs a authentication header
//this saves your token and uses it as the header
const setAuthorizationHeader = (token) => {
  const FBIdToken = 'Bearer ' + token;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}

//this will remove the token from the users localstorage aswell as
//remove the authenication header from any more requests they make 
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({type: SET_UNAUTHENTICATED});
}


