import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';
import {reduxFirestore} from 'redux-firestore';

import { getFirebase } from 'react-redux-firebase';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore'
//import { initializeApp } from 'firebase';

import firebase from './config/fbConfig';

const middlewares = [
  thunk.withExtraArgument(getFirebase)
]
const initialState = {}
const store = createStore(rootReducer, initialState, compose (
  applyMiddleware(...middlewares),
  reduxFirestore(firebase)
));

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
