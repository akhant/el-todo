import { SET_LANG } from './../const';
import { AnyAction } from 'redux';

export default (state: any = {}, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_LANG:
      return payload;

    default:
      return state;
  }
};
