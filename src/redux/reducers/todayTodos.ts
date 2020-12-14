import { GET_TODOS } from './../const';
import { IDataItem } from '../../components/App';
import { AnyAction } from 'redux';
import { ADD_TODO, DONE_TODO, REMOVE_TODO } from '../const';

export default (state: IDataItem[] = [], { type, payload }: AnyAction) => {
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
          item.done = !payload.doneStatus;
        }
        return item;
      });
    default:
      return state;
  }
};
