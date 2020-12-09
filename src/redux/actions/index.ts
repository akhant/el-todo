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

export const getTodos = (date: string) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/`, { date });

  dispatch({
    type: GET_TODOS,
    payload: res.data,
  });
};

export const removeTodo = (id: number) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/remove`, { id });

  dispatch({
    type: REMOVE_TODO,
    payload: res.data,
  });
};

export const doneTodo = (id: number) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/done`, { id });

  dispatch({
    type: DONE_TODO,
    payload: res.data,
  });
};
