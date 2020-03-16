// Import helper function
import { combineReducers } from 'redux';

// Import all reducers
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';
import authReducer from './authReducer';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm
});

// Export combined reducers as a rootReducer
export default rootReducer;
