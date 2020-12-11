import React, { useState, useEffect } from 'react';
import { IDataItem } from './App';
import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { removeTodo, doneTodo } from '../redux/actions';

export interface ICustomListItemProps {
  item: IDataItem;
  removeTodo: (id: number) => Promise<void>;
  doneTodo: (id: number, doneStatus: boolean) => Promise<void>;
  done: boolean
}

const CustomListItem: React.FC<ICustomListItemProps> = ({
  item,
  doneTodo,
  removeTodo,
  done
}) => {

  const [doneStatus, setDoneStatus] = useState(done);

  const handleClickDone = () => {
    setDoneStatus(state => !state);
    doneTodo(item.id, doneStatus);
  };

  const handleClickRemove = () => {
    removeTodo(item.id);
  };

  useEffect(()=>{
    setDoneStatus(done)
  }, [done])

  console.log('item', item.text, done);
  return (
    <div className='list__item'>
      <span
        className='list__item_text'
        style={{ textDecoration: doneStatus ? 'line-through' : 'none' }}
      >
        {item.text}
      </span>

      <div className='list__item_buttons'>
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

export default connect(null, { removeTodo, doneTodo })(
  React.memo(CustomListItem)
);
