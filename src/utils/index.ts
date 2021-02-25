import thunk from 'redux-thunk';
import { RootState } from './../redux/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers';

export const storeFactory = (initialState: RootState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
