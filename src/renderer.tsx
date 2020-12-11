//import './server/server'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import 'antd/dist/antd.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducers/index'
import App from './components/App'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Main />, document.getElementById('app'));
});
