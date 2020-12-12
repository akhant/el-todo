import React, { useState } from 'react';
import { IDataItem } from './App';
import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { removeTodo, doneTodo } from '../redux/actions';

export interface ICustomListItemWithDateProps {
  item: IDataItem;
  removeTodo: (id: number) => Promise<void>;
  doneTodo: (id: number, doneStatus: boolean) => Promise<void>;
}

const CustomListItemWihDate: React.FC<ICustomListItemWithDateProps> = ({
  item,
  doneTodo,
  removeTodo,
}) => {
  const [doneStatus, setDoneStatus] = useState(item.done);

  const handleClickDone = () => {
    setDoneStatus((state) => !state);
    doneTodo(item.id, doneStatus);
  };

  const handleClickRemove = () => {
    removeTodo(item.id);
  };
  return (
    <div className='list-with-date__item'>
      <span
        className='list-with-date__item_text'
        style={{ textDecoration: doneStatus ? 'line-through' : 'none' }}
      >
        {item.text}
      </span>
      <span className='list-with-date__item_date'>{item.date}</span>

      <div className='list-with-date__item_buttons'>
        <Button onClick={handleClickDone}>
          <CheckOutlined style={{ color: doneStatus ? '#40a9ff' : 'black' }} />
        </Button>
        <Button onClick={handleClickRemove}>
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { removeTodo, doneTodo })(CustomListItemWihDate);
