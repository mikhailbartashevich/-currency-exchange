import React from 'react';
import { shallow } from 'enzyme';
import { Rate } from './Rate';

describe('ExchangeFab', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Rate debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Rate />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const inputCurrency = { currency: 'USD', symbol: '$' };
    const outputCurrency = { currency: 'EUR', symbol: '€' };
    const component = shallow(
      <Rate
        rate="0.23"
        inputCurrency={inputCurrency}
        outputCurrency={outputCurrency}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
