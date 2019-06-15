import React from 'react';
import { shallow } from 'enzyme';
import { ExchangeFab } from './ExchangeFab';

describe('ExchangeFab', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ExchangeFab debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<ExchangeFab />);
    expect(component).toMatchSnapshot();
  });

});
