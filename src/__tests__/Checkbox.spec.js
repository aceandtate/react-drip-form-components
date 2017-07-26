import React from 'react';
import { shallow } from 'enzyme';
import { mockFieldProps } from './utils';
import { Checkbox } from '../Checkbox';
import SwitchField from '../internal/SwitchField';
import SwitchControl from '../internal/SwitchControl';
import Label from '../internal/Label';
import ErrorLabel from '../internal/ErrorLabel';


describe('<Checkbox />', () => {
  test('Should be pass function props', () => {
    const shouldDisplayError = jest.fn();
    const shouldDisplaySpinner = jest.fn();
    const props = mockFieldProps({
      shouldDisplayError,
      shouldDisplaySpinner,
    });

    expect(shouldDisplayError.mock.calls.length).toBe(0);
    expect(shouldDisplaySpinner.mock.calls.length).toBe(0);

    shallow(<Checkbox {...props} />);

    expect(shouldDisplayError.mock.calls.length).toBe(1);
    expect(shouldDisplayError.mock.calls[0]).toEqual([props]);
    expect(shouldDisplaySpinner.mock.calls.length).toBe(1);
    expect(shouldDisplaySpinner.mock.calls[0]).toEqual([props]);
  });


  test('Should be render control and label', () => {
    const props = mockFieldProps();

    const wrapper = shallow(
      <Checkbox {...props}>
        foo
      </Checkbox>
    );

    const {
      input,
      meta,
      shouldDisplayError,
      shouldDisplaySpinner,
      children,
      ...rest
    } = props;

    expect(wrapper.equals(
      <SwitchField disabled={rest.disabled}>
        <Label htmlFor={null}>
          <SwitchControl
            {...rest}
            {...input}
            type="checkbox"
          />
          <span>foo</span>
        </Label>
      </SwitchField>
    )).toBe(true);
  });


  test('Should be render disabled control', () => {
    const props = mockFieldProps({
      children: 'bar',
      disabled: true,
    });

    const wrapper = shallow(<Checkbox {...props} />);

    const {
      input,
      meta,
      shouldDisplayError,
      shouldDisplaySpinner,
      children,
      ...rest
    } = props;

    expect(wrapper.equals(
      <SwitchField disabled={rest.disabled}>
        <Label htmlFor={null}>
          <SwitchControl
            {...rest}
            {...input}
            disabled
            type="checkbox"
          />
          <span>bar</span>
        </Label>
      </SwitchField>
    )).toBe(true);
  });


  test('Should be render error text', () => {
    const props = mockFieldProps({
      children: 'bar',
      disabled: true,
      shouldDisplayError: () => true,
      meta: {
        error: 'error text',
      },
    });

    const wrapper = shallow(<Checkbox {...props} />);

    const {
      input,
      meta,
      shouldDisplayError,
      shouldDisplaySpinner,
      children,
      ...rest
    } = props;

    expect(wrapper.equals(
      <SwitchField disabled={rest.disabled}>
        <Label htmlFor={null}>
          <SwitchControl
            {...rest}
            {...input}
            disabled
            type="checkbox"
          />
          <span>bar</span>
        </Label>
        <ErrorLabel>error text</ErrorLabel>
      </SwitchField>
    )).toBe(true);
  });
});
