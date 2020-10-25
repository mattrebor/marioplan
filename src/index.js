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
import {connect} from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
    authIsLoaded: state.firebase.auth && state.firebase.auth.isLoaded
  }
}

const WaitTillAuth = connect(mapStateToProps)(({authIsLoaded}) => {
  if (!authIsLoaded) {
    return (
      <div className="center">loading...</div>
    )
  }
  else {
    return (
      <App />
    )
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <WaitTillAuth />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
