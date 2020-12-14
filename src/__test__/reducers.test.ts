import { IDataItem } from './../components/App';
import {
  ADD_TODO,
  DONE_TODO,
  REMOVE_TODO,
  GET_TODOS,
  GET_ALL_NOT_DONE_TODOS,
} from '../redux/const';
import todayReducer from '../redux/reducers/todayTodos';
import notDoneReducer from '../redux/reducers/notDoneTodos';
import { AnyAction } from 'redux';

export const stateNotDoneTodos: IDataItem[] = [
  { text: 'do app', done: false, date: '01/01/2020', id: 1 },
  { text: 'do next app', done: true, date: '03/01/2020', id: 2 },
  { text: 'do next ', done: true, date: '04/01/2020', id: 3 },
];

const item: IDataItem = {
  text: 'a',
  date: 'today',
  done: false,
  id: 1,
};
let reducer: (state: IDataItem[], action: AnyAction) => IDataItem[];

describe('todayTodos reducer', () => {
  beforeAll(() => {
    reducer = todayReducer;
  });

  it('ADD_TODO', () => {
    const newState = reducer([], { type: ADD_TODO, payload: item });
    expect(newState[0]).toEqual(item);
  });

  it('REMOVE_TODO', () => {
    const payload = {
      id: 1,
    };
    const newState = reducer(stateNotDoneTodos, {
      type: REMOVE_TODO,
      payload,
    });
    expect(newState).toHaveLength(stateNotDoneTodos.length - 1);
  });

  it('DONE_TODO', () => {
    const payload = {
      id: 1,
      done: false,
    };
    const newState = reducer(stateNotDoneTodos, {
      type: DONE_TODO,
      payload,
    });
    expect(
      newState.some(
        (item: IDataItem) =>
          item.id === payload.id && item.done === !payload.done
      )
    ).toBe(true);
  });

  it('GET_TODOS', () => {
    const newState = reducer([], {
      type: GET_TODOS,
      payload: stateNotDoneTodos,
    });
    expect(newState).toEqual(stateNotDoneTodos);
  });
});

describe('notDoneTodos reducer', () => {
  beforeAll(() => {
    reducer = notDoneReducer;
  });
  it('ADD_TODO', () => {
    const newState = reducer([], { type: ADD_TODO, payload: item });
    expect(newState[0]).toEqual(item);
  });

  it('REMOVE_TODO', () => {
    const payload = {
      id: 1,
    };
    const newState = reducer(stateNotDoneTodos, {
      type: REMOVE_TODO,
      payload,
    });
    expect(newState).toHaveLength(stateNotDoneTodos.length - 1);
  });

  it('DONE_TODO', () => {
    const payload = {
      id: 1,
    };
    const newState = reducer(stateNotDoneTodos, {
      type: REMOVE_TODO,
      payload,
    });
    expect(newState).toHaveLength(stateNotDoneTodos.length - 1);
  });

  it('GET_ALL_NOT_DONE_TODOS', () => {
    const newState = reducer([], {
      type: GET_ALL_NOT_DONE_TODOS,
      payload: stateNotDoneTodos,
    });
    expect(newState).toEqual(stateNotDoneTodos);
  });
});
