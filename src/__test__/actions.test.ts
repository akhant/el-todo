import { IDataItem } from './../components/App';
import { addTodo, removeTodo } from './../redux/actions/index';
import * as React from 'react';
import { storeFactory } from '../utils';
import { RootState } from '../redux/reducers';
import moxios from 'moxios';

let store: any;

export const initialStateTodos: IDataItem[] = [
  { text: 'do app', done: false, date: '01/01/2020', id: 1 },
  { text: 'do next app', done: false, date: '03/01/2020', id: 2 },
  { text: 'do next ', done: true, date: '04/01/2020', id: 3 },
];

const initialRootReducer: RootState = {
  todayTodos: initialStateTodos,
  notDoneTodos: initialStateTodos.slice(0, 2),
  langData: {},
};

describe('moxios tests', () => {
  beforeEach(() => {
    store = storeFactory(initialRootReducer);

    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('action add', (done) => {
    let item = { text: 'abc', date: '12/12/12', done: false };

    store.dispatch(addTodo(item));

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      request
        .respondWith({
          status: 200,
          response: {
            ...item,
            id: 1,
          },
        })
        .then(() => {
          const newState = store.getState();

          const expectedState = [...initialStateTodos, { ...item, id: 1 }];
          expect(newState.todayTodos).toEqual(expectedState);
          done();
        });
    });
  });

  it('action remove', (done) => {
    const id = 1;

    store.dispatch(removeTodo(id));

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      request
        .respondWith({
          status: 200,
          response: {
            id: 1,
          },
        })
        .then(() => {
          const newState = store.getState();

          // length less by 1 then initialState
          expect(newState.todayTodos.length).toBe(initialStateTodos.length - 1);
          done();
        });
    });
  });
});
