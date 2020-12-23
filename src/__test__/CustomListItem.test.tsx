import * as React from 'react';
import { ShallowWrapper, mount, HTMLAttributes } from 'enzyme';
import { CustomListItem } from '../components/CustomListItem';

describe('intaractive elements', () => {
  let mockItem = {
    done: false,
    text: 'aaa',
    date: '234234',
    id: 1,
  };
  let wrapper: any;
  let mockRemoveTodo: any = jest.fn();
  let mockDoneTodo: any = jest.fn();

  beforeEach(() => {
    mockRemoveTodo.mockClear();
    mockDoneTodo.mockClear();

    wrapper = mount(
      <CustomListItem
        item={mockItem}
        doneTodo={mockDoneTodo}
        removeTodo={mockRemoveTodo}
      />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('remove btn click', () => {
    wrapper.find('.list__item_remove-btn').hostNodes().simulate('click');

    expect(mockRemoveTodo).toHaveBeenCalled();
  });

  it('done btn click', () => {
    wrapper.find('.list__item_done-btn').hostNodes().simulate('click');

    expect(mockDoneTodo).toHaveBeenCalled();
  });
});
