import React from 'react';
import { shallow } from 'enzyme';
import { ExchangerRaw } from './Exchanger';

describe('Exchanger', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ExchangerRaw debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<ExchangerRaw />);
    expect(component).toMatchSnapshot();
  });

  it('should render form with given props', () => {
    const inputCurrency = { currency: 'USD', symbol: '$' };
    const outputCurrency = { currency: 'EUR', symbol: '€' };
    const currencyOptions = [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ];
    const fetchRatesFn = jest.fn();
    const component = shallow(
      <ExchangerRaw
        inputAmount="10"
        inputCurrency={inputCurrency}
        outputAmount="10"
        outputCurrency={outputCurrency}
        currencyRate="0.6"
        currencyOptions={currencyOptions}
        availableInputAmount={20}
        availableOutputAmount={30}
        fetchRates={fetchRatesFn}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('button click should send exchange event', () => {
    const clickFn = jest.fn();
    const inputCurrency = { currency: 'USD', symbol: '$' };
    const outputCurrency = { currency: 'EUR', symbol: '€' };
    const component = shallow(
      <ExchangerRaw
        inputAmount="10"
        inputCurrency={inputCurrency}
        outputAmount="10"
        outputCurrency={outputCurrency}
        currencyRate="0.6"
        availableInputAmount={20}
        availableOutputAmount={30}
        exchange={clickFn}
      />,
    );
    component.find('pure(WithStyles(ExchangeFabRaw))').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
