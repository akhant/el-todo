import { combineReducers } from 'redux';
import todayTodos from './todayTodos';
import notDoneTodos from './notDoneTodos';
import langData from './lang';

const rootReducer = combineReducers({
  todayTodos,
  notDoneTodos,
  langData,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
