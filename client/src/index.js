// Import statements
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import materialize css
import 'materialize-css/dist/css/materialize.min.css';

// Import root reducer and main App component
import rootReducer from './reducers';
import App from './components/App';

// Create redux store, apply thunk and redux devtools as middleware
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // Add line below to enable redux chrome dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Render App wrapper with redux Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
