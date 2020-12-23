export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const DONE_TODO = 'DONE_TODO';
export const GET_TODOS = 'GET_TODOS';
// format for "toDateString()"
export const DATE_FORMAT = 'ddd MMM DD YYYY';
export const GET_ALL_NOT_DONE_TODOS = 'GET_ALL_NOT_DONE_TODOS';
export const SET_LANG = 'SET_LANG';

export interface ILangTextList {
  addBtnText: string;
  placeholder: string;
  modalTitle: string;
  showAll: string;
  cancelBtnText: string;
  okBtnText: string;
}

export const languageData = {
  en: {
    addBtnText: 'Add',
    placeholder: 'What will I do?',
    modalTitle: 'What I will do...',
    showAll: `Show all haven't done todos`,
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
  },
  ru: {
    addBtnText: 'Добавить',
    placeholder: 'Что я сделаю?',
    modalTitle: 'Вот что я сделаю...',
    showAll: `Показать все невыполненные задачи`,
    cancelBtnText: 'Закрыть',
    okBtnText: 'Хорошо',
  },
};
