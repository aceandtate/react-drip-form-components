import React from 'react';
import { shallow } from 'enzyme';
import { mockFieldProps } from './utils';
import { Textarea } from '../Textarea';


describe('<Textarea />', () => {
  test('Should be pass function props', () => {
    const shouldDisplayError = jest.fn();
    const shouldDisplaySpinner = jest.fn();
    const props = mockFieldProps({
      shouldDisplayError,
      shouldDisplaySpinner,
    });

    expect(shouldDisplayError.mock.calls.length).toBe(0);
    expect(shouldDisplaySpinner.mock.calls.length).toBe(0);

    shallow(<Textarea {...props} />);

    expect(shouldDisplayError.mock.calls.length).toBe(1);
    expect(shouldDisplayError.mock.calls[0]).toEqual([props]);
    expect(shouldDisplaySpinner.mock.calls.length).toBe(1);
    expect(shouldDisplaySpinner.mock.calls[0]).toEqual([props]);
  });


  test('Should be render control', () => {
    const props = mockFieldProps();
    const wrapper = shallow(<Textarea {...props} />);

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render disabled control', () => {
    const props = mockFieldProps({ disabled: true });
    const wrapper = shallow(<Textarea {...props} />);

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render error text', () => {
    const props = mockFieldProps({
      shouldDisplayError: () => true,
      meta: {
        error: 'foo',
      },
    });

    const wrapper = shallow(<Textarea {...props} />);

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render spinner', () => {
    const props = mockFieldProps({
      shouldDisplaySpinner: () => true,
    });

    const wrapper = shallow(<Textarea {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
