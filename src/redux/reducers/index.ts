import { combineReducers } from 'redux';
import todayTodos from './todayTodos';
import notDoneTodos from './notDoneTodos';

const rootReducer = combineReducers({
  todayTodos,
  notDoneTodos,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
