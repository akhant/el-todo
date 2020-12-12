import React, { useState, useEffect, useReducer } from 'react';
import { DatePicker, Input, Button, List, Modal } from 'antd';
import moment from 'moment';
import { addTodo, getTodos, getAllNotDoneTodos } from '../redux/actions';
import { connect } from 'react-redux';
import { DATE_FORMAT } from '../redux/const';
import CustomListItemWithDate from './CustomListItemWithDate';
import CustomListItem from './CustomListItem';
import { RootState } from '../redux/reducers';

export interface IDataItem {
  text: string;
  done: boolean;
  date: string;
  id?: number;
}

export interface IAppProps {
  todayTodos: IDataItem[];
  notDoneTodos: IDataItem[];
  addTodo: any;
  getTodos: any;
  getAllNotDoneTodos: any;
}

const App = React.memo(
  ({
    todayTodos,
    notDoneTodos,
    addTodo,
    getTodos,
    getAllNotDoneTodos,
  }: IAppProps) => {
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState(moment());
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChangeDate = (newDate: any) => {
      setDate(newDate);
      getTodos(newDate.format(DATE_FORMAT));
    };

    const handleInput = (e: any) => {
      setTodo(e.target.value);
    };

    const handleAddTodo = () => {
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
        <DatePicker
          value={date}
          defaultValue={moment()}
          onChange={handleChangeDate}
        />
        <div className='main-page__add'>
          <Input
            placeholder='What will I do?'
            onPressEnter={handleAddTodo}
            value={todo}
            onChange={handleInput}
          />
          <Button onClick={handleAddTodo} className='button_add'>
            Add
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
          Show all haven't done todos
        </Button>

        <Modal
          title='What I still need to do'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
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
  }
);

export default connect(
  ({ todayTodos, notDoneTodos }: RootState) => ({ todayTodos, notDoneTodos }),
  { getTodos, addTodo, getAllNotDoneTodos }
)(App);
