import React from 'react';
import { render, shallow, mount } from 'enzyme';
import ConnectedApp, { IAppProps, App } from '../components/App';
import { storeFactory } from '../utils';
import { Provider } from 'react-redux';
import { RootState } from '../redux/reducers';
import { act } from 'react-dom/test-utils';
import moxios from 'moxios';

let wrapper: any;

const initialRootReducer: RootState = {
  todayTodos: [],
  notDoneTodos: [],
  langData: {},
};

describe('Components are rendering', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory(initialRootReducer);
    wrapper = render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  });
  it('should render DatePicker component', () => {
    const node = wrapper.find('.ant-picker');

    expect(node.html()).toContain('ant-picker-input');
  });
  it('should render input element', () => {
    const node = wrapper.find('.add');

    expect(node.html()).toContain('input');
    expect(node.html()).toContain('button');
  });

  it('should render list element', () => {
    const node = wrapper.find('.list');
    expect(node.length).toBe(1);
  });
});

describe('intaractive elements', () => {
  let wrapper: any;
  let mockGetTodos: any = jest.fn();
  let mockGetAllNotDoneTodos: any = jest.fn();
  let mockAddTodo = jest.fn();

  beforeEach(() => {
    mockGetTodos.mockClear();
    mockGetAllNotDoneTodos.mockClear();
    mockAddTodo.mockClear();
    wrapper = mount(
      <App
        getAllNotDoneTodos={mockGetAllNotDoneTodos}
        getTodos={mockGetTodos}
        addTodo={mockAddTodo}
      />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('input change', () => {
    wrapper
      .find('.add__input')
      .hostNodes()
      .simulate('change', { target: { value: 'abc' } });

    expect(wrapper.find('.add__input').hostNodes().props().value).toBe('abc');
  });

  it('getTodos was called', () => {
    expect(mockGetTodos).toHaveBeenCalled();
  });

  it('modal opens', () => {
    wrapper.find('.button_get-all').hostNodes().simulate('click');
    expect(wrapper.find('.ant-modal-mask').exists()).toBe(true);
  });

  it('getTodo has been called', () => {
    wrapper
      .find('.add__input')
      .hostNodes()
      .simulate('change', { target: { value: 'abc' } });
    wrapper.find('.add__button').hostNodes().simulate('click');
    expect(mockAddTodo).toHaveBeenCalled();
  });
});
