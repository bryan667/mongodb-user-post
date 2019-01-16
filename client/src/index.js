import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import Reducer from './redux/reducers/index'



const createStoreMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));