import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm
});

export default rootReducer;
