import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { removeTodo, doneTodo } from '../redux/actions';
import { ICustomListItemProps } from 'src/interfaces';

export const CustomListItem: React.FC<ICustomListItemProps> = ({
  item,
  doneTodo,
  removeTodo,
  done,
}) => {
  const [doneStatus, setDoneStatus] = useState(done);
  console.log('item', item);
  const handleClickDone = () => {
    console.log('done before', doneStatus, '->', !doneStatus);
    doneTodo(item.id, !doneStatus);

    setDoneStatus((state) => !state);
  };

  const handleClickRemove = () => {
    removeTodo(item.id);
  };

  useEffect(() => {
    setDoneStatus(done);
  }, [done]);

  return (
    <div className='list__item'>
      <span
        className='list__item_text'
        style={{ textDecoration: doneStatus ? 'line-through' : 'none' }}
      >
        {item.text}
      </span>

      <div className='list__item_buttons'>
        <Button className='list__item_done-btn' onClick={handleClickDone}>
          <CheckOutlined style={{ color: doneStatus ? '#40a9ff' : 'black' }} />
        </Button>
        <Button className='list__item_remove-btn' onClick={handleClickRemove}>
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

//@ts-ignore
export default connect(null, { removeTodo, doneTodo })(CustomListItem);
