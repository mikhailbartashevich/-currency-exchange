import React from 'react';
import { shallow } from 'enzyme';
import { SwapIconButton } from './SwapIconButton';

describe('SwapIconButton', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SwapIconButton debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<SwapIconButton />);
    expect(component).toMatchSnapshot();
  });

});
