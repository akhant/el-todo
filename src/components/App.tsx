import React, { useState, useEffect, useReducer } from 'react';
import { DatePicker, Input, Button, List, Modal } from 'antd';
import moment from 'moment';
import { addTodo, getTodos, getAllNotDoneTodos } from '../redux/actions';
import { connect } from 'react-redux';
import { DATE_FORMAT, ILangTextList } from '../redux/const';
import CustomListItemWithDate from './CustomListItemWithDate';
import CustomListItem from './CustomListItem';
import { RootState } from '../redux/reducers';
import LanguagePicker from './LanguagePicker';

export interface IDataItem {
  text: string;
  done: boolean;
  date: string;
  id?: number;
}

export interface IAppProps {
  todayTodos?: IDataItem[];
  notDoneTodos?: IDataItem[];
  addTodo?: any;
  getTodos?: any;
  getAllNotDoneTodos?: any;
  langData?: ILangTextList;
}

export const App = ({
  todayTodos,
  notDoneTodos,
  addTodo,
  getTodos,
  langData,
  getAllNotDoneTodos,
}: IAppProps) => {
  const [todo, setTodo] = React.useState('');
  const [date, setDate] = React.useState(moment());
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleChangeDate = (newDate: any) => {
    setDate(newDate);
    getTodos(newDate.format(DATE_FORMAT));
  };

  const handleInput = (e: any) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (!todo) return;
    const item = {
      text: todo,
      done: false,
      date: date.format(DATE_FORMAT),
    };
    addTodo(item);
    setTodo('');
  };

  const handleGetAllNotDoneTodos = () => {
    getAllNotDoneTodos();
    showModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getTodos(date.format(DATE_FORMAT));
  }, []);

  return (
    <div className='main-page'>
      <LanguagePicker />
      <DatePicker
        value={date}
        defaultValue={moment()}
        onChange={handleChangeDate}
      />
      <div className='add'>
        <Input
          className='add__input'
          placeholder={langData.placeholder}
          onPressEnter={handleAddTodo}
          value={todo}
          onChange={handleInput}
        />
        <Button onClick={handleAddTodo} className='add__button'>
          {langData.addBtnText}
        </Button>
      </div>
      <List
        className='list'
        size='large'
        bordered
        dataSource={todayTodos}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <CustomListItem done={item.done} item={item} />
          </List.Item>
        )}
      />

      <Button className='button_get-all' onClick={handleGetAllNotDoneTodos}>
        {langData.showAll}
      </Button>

      <Modal
        title={langData.modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={langData.cancelBtnText}
        okText={langData.okBtnText}
      >
        <List
          className='list-with-date'
          size='large'
          bordered
          dataSource={notDoneTodos}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CustomListItemWithDate item={item} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default connect(
  ({ todayTodos, notDoneTodos, langData }: RootState) => ({
    langData,
    todayTodos,
    notDoneTodos,
  }),
  { getTodos, addTodo, getAllNotDoneTodos }
)(App);
