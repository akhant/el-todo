import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Button, List } from 'antd';
import moment from 'moment';
import { addTodo, removeTodo, doneTodo, getTodos } from '../redux/actions';
import { connect } from 'react-redux';
import { DATE_FORMAT } from '../redux/const';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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

  const handleChangeDate = (data: any) => {
    setDate(data);
    console.log(data.format(DATE_FORMAT));
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

  const handleClickDone = () => {
   
  };

  const handleClickRemove = () => {
 
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <DatePicker
        value={date}
        defaultValue={moment()}
        onChange={handleChangeDate}
      />
      <Input onPressEnter={handleAddTodo} value={todo} onChange={handleInput} />
      <List
        size='large'
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div>
              {item.text}
              <Button onClick={handleClickDone}>
                <CheckOutlined />
              </Button>
              <Button onClick={handleClickRemove}>
                <CloseOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect((data) => ({ data }), { getTodos, addTodo })(App);
