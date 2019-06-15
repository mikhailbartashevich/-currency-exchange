import React from 'react';
import { shallow } from 'enzyme';
import { CurrencyInput } from './CurrencyInput';

describe('Balance', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CurrencyInput debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<CurrencyInput />);
    expect(component).toMatchSnapshot();
  });

  it('should render balance with given props', () => {
    const inputCurrency = { currency: 'USD', symbol: '$' };
    const changeInputAmount = () => console.log('changeInputAmount');
    const changeInputCurrency = () => console.log('changeInputCurrency');
    const currencyOptions = [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ];
    const component = shallow(
      <CurrencyInput
        amount="30"
        currency={inputCurrency}
        currencyOptions={currencyOptions}
        actions={{
          changeAmount: changeInputAmount,
          changeCurrency: changeInputCurrency,
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
