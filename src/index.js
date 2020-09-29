import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import tasksReducer from './store/reducers/tasks-reducer';
import loginReducer from './store/reducers/login-reducer';
import profilesReducer from './store/reducers/profiles-reducer';

import 'animate.css/animate.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
axios.defaults.baseURL = 'http://127.0.0.1:5000';
// axios.defaults.baseURL = 'http://34.210.128.197:5000';
// axios.defaults.baseURL = 'http://54.190.13.88';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
  loginReducer: loginReducer,
  profilesReducer: profilesReducer
});

const reduxStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
