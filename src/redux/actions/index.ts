import { IDataItem } from './../../interfaces/index';
import { GET_TODOS, GET_ALL_NOT_DONE_TODOS, SET_LANG } from './../const';
import { Dispatch } from 'redux';
import { ADD_TODO, REMOVE_TODO, DONE_TODO } from '../const';
import axios from 'axios';

const api = 'http://localhost:3005/api';

export const addTodo = (item: IDataItem) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/add`, item);

  return dispatch({
    type: ADD_TODO,
    payload: res.data,
  });
};

export const getTodos = (date: string) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/`, { date });

  return dispatch({
    type: GET_TODOS,
    payload: res.data,
  });
};

export const getAllNotDoneTodos = () => async (dispatch: Dispatch) => {
  const res = await axios.get(`${api}/allnotdone`);

  return dispatch({
    type: GET_ALL_NOT_DONE_TODOS,
    payload: res.data,
  });
};

export const removeTodo = (id: number) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/remove`, { id });

  return dispatch({
    type: REMOVE_TODO,
    payload: res.data,
  });
};

export const doneTodo = (id: number, doneStatus: boolean) => async (
  dispatch: Dispatch
) => {
  const res = await axios.post(`${api}/done`, { id, doneStatus });
  return dispatch({
    type: DONE_TODO,
    payload: { id, doneStatus: res.data.done },
  });
};

export const getLang = (lang: string) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${api}/lang`, { lang });
  return dispatch({
    type: SET_LANG,
    payload: res.data,
  });
};
