// Import axios to help with http requests
import axios from 'axios';

// Import constants
import { FETCH_USER, FETCH_SURVEYS } from '../constants';

// Define and export all action creators
export const fetchUser = () => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: (await axios.get('/api/current_user')).data
  });

export const handleToken = token => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/stripe', token)).data
  });

export const submitSurvey = (values, history) => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/surveys', values)).data
  });
  // Redirect to dashboard
  history.push('/surveys');
};

export const fetchSurveys = () => async dispatch =>
  dispatch({
    type: FETCH_SURVEYS,
    payload: (await axios.get('/api/surveys')).data
  });
