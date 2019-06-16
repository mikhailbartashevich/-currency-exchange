import React from 'react';
import { shallow } from 'enzyme';
import { Balance } from './Balance';

describe('Balance', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Balance debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Balance />);
    expect(component).toMatchSnapshot();
  });

  it('should render balance with given props', () => {
    const inputCurrency = { currency: 'USD', symbol: '$' };
    const component = shallow(<Balance amount={10} currency={inputCurrency} />);
    expect(component).toMatchSnapshot();
  });
});
