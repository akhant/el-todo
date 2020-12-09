import React, { useState } from 'react';
import { IDataItem } from './App';
import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { removeTodo, doneTodo } from '../redux/actions';

export interface ICustomListItemProps {
  item: IDataItem;
  removeTodo: (id: number) => Promise<void>;
  doneTodo: (id: number) => Promise<void>;
}

const CustomListItem: React.FC<ICustomListItemProps> = ({
  item,
  doneTodo,
  removeTodo,
}) => {
  const [doneStatus, setDoneStatus] = useState(item.done);

  const handleClickDone = () => {
    setDoneStatus(true)
    doneTodo(item.id);
  };

  const handleClickRemove = () => {
    removeTodo(item.id);
  };
  return (
    <div className='list__item'>
      <span style={{ textDecoration: doneStatus ? 'line-through' : 'none' }}>
        {item.text}
      </span>
      <Button onClick={handleClickDone}>
        <CheckOutlined />
      </Button>
      <Button onClick={handleClickRemove}>
        <CloseOutlined />
      </Button>
    </div>
  );
};

export default connect(null, { removeTodo, doneTodo })(CustomListItem);
