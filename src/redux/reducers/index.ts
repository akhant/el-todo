import { GET_TODOS } from './../const';
import { IDataItem } from '../../components/App';
import { AnyAction } from 'redux';
import { ADD_TODO, DONE_TODO, REMOVE_TODO } from '../const';

let initialState: IDataItem[] = [
  { text: 'do app', done: false, date: '01/01/2020' },
  { text: 'do next app', done: true, date: '02/01/2020' },
];

export default (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_TODO:
      return [...state, payload];

    case GET_TODOS:
      return payload;

    case REMOVE_TODO:
      return state.filter((item) => {
        return item.id !== payload.id;
      });
    case DONE_TODO:
      return state.map((item) => {
        if (item.id === payload.id) {
          item.done === true;
        }
        return item;
      });
    default:
      return state;
  }
};
