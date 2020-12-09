import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Button, List } from 'antd';
import moment from 'moment';
import { addTodo, getTodos } from '../redux/actions';
import { connect } from 'react-redux';
import { DATE_FORMAT } from '../redux/const';

import CustomListItem from './CustomListItem';

export interface IDataItem {
  text: string;
  done: boolean;
  date: string;
  id?: number;
}

export interface IAppProps {
  data: IDataItem[];
  addTodo: any;
  getTodos: any;
}

const App: React.FC<IAppProps> = ({ data, addTodo, getTodos }) => {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState(moment());

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

  const handleClickGetAllDoneTodos = () => {};

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
      <Input
        placeholder='What will I do?'
        onPressEnter={handleAddTodo}
        value={todo}
        onChange={handleInput}
      />
      <List
        className='list'
        size='large'
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <CustomListItem item={item} />
          </List.Item>
        )}
      />
      <Button onClick={handleClickGetAllDoneTodos}>Get all not done</Button>
    </div>
  );
};

export default connect((data) => ({ data }), { getTodos, addTodo })(App);
