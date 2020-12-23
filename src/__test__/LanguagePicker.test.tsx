import { mount, ShallowWrapper } from 'enzyme';
import React from 'react';
import { LanguagePicker } from '../components/LanguagePicker';

describe('LanguagePicker', () => {
  let mockGetLang = jest.fn();
  let wrapper: any;
  beforeEach(() => {
    mockGetLang.mockClear();
    wrapper = mount(<LanguagePicker getLang={mockGetLang} />);
  });

  it('renders', () => {
    expect(wrapper.find('.lang__select').exists()).toBe(true);
  });
  it('initiate action on change', () => {
    wrapper.find('.lang__select').hostNodes().simulate('change', 'ru');

    expect(mockGetLang).toBeCalled();
  });
});
