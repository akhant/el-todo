import { GET_TODOS } from './../const';
import { IDataItem } from './../../components/App';
import { Dispatch } from 'redux';
import { ADD_TODO, REMOVE_TODO, DONE_TODO } from '../const';
import axios from 'axios';

const api = 'http://localhost:3005/api';

export const addTodo = (item: IDataItem) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/add`, item);

  dispatch({
    type: ADD_TODO,
    payload: res.data,
  });
};

export const getTodos = () => async (dispatch: Dispatch) => {
  const res = await axios.get(`${api}/`);

  dispatch({
    type: GET_TODOS,
    payload: res.data,
  });
};

export const removeTodo = (item: IDataItem) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/add`, item);

  dispatch({
    type: REMOVE_TODO,
    payload: res.data,
  });
};

export const doneTodo = (item: IDataItem) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/add`, item);

  dispatch({
    type: DONE_TODO,
    payload: res.data,
  });
};
