import axios from 'axios';
import { FETCH_USER } from '../constants';

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
