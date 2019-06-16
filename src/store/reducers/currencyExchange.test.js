import { currencyExchange } from './currencyExchange';
import {
  EXCHANGE,
  CHANGE_INPUT_CURRENCY,
  CHANGE_INPUT_AMOUNT,
  CHANGE_OUTPUT_CURRENCY,
  RECEIVE_CURRENCY_RATES,
  UPDATE_ALL_CURRENCIES,
} from '../actions/currencyExchangeActions';

it('tests reducer', () => {
  const initialState = {
    inputAmount: '',
    inputCurrency: { currency: 'EUR', symbol: '€' },
    outputAmount: '',
    outputCurrency: { currency: 'USD', symbol: '$' },
    currencyOptions: [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ],
    currencyRate: 1.13,
    loadingRates: false,
    availableInputAmount: 100,
    availableOutputAmount: 100,
    pocket: [
      { currency: 'USD', amount: 100 },
      { currency: 'EUR', amount: 100 },
      { currency: 'GBP', amount: 100 },
    ],
  };
  const newState = currencyExchange(initialState, { type: EXCHANGE });
  expect(newState.availableInputAmount).toBe(100);

  const stateAfterExchange = currencyExchange(newState, {
    type: CHANGE_INPUT_CURRENCY,
    currency: { currency: 'EUR', symbol: '€' },
  });
  expect(stateAfterExchange.inputCurrency.currency).toBe('EUR');

  const stateAfterChangeInput = currencyExchange(stateAfterExchange, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(stateAfterChangeInput.inputAmount).toBe('100');

  const stateAfterSecondExchange = currencyExchange(stateAfterChangeInput, {
    type: EXCHANGE,
  });

  expect(stateAfterSecondExchange.availableInputAmount).toBe(0);
  expect(stateAfterSecondExchange.availableOutputAmount).toBe(213);
});

it('tests reducer - no EUR in pocket', () => {
  const initialState = {
    inputAmount: 0,
    inputCurrency: { currency: 'EUR', symbol: '€' },
    outputAmount: 0,
    outputCurrency: { currency: 'USD', symbol: '$' },
    currencyOptions: [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ],
    currencyRate: 1.13,
    loadingRates: false,
    availableInputAmount: 0,
    availableOutputAmount: 213,
    pocket: [
      { currency: 'USD', amount: 213 },
      { currency: 'EUR', amount: 0 },
      { currency: 'GBP', amount: 100 },
    ],
  };

  const stateAfterInputAmountChange = currencyExchange(initialState, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(stateAfterInputAmountChange.inputAmount).toBe('100');

  const stateAfterExchange = currencyExchange(stateAfterInputAmountChange, {
    type: EXCHANGE,
  });
  expect(stateAfterExchange.availableInputAmount).toBe(0);
  expect(stateAfterExchange.availableOutputAmount).toBe(213);

  expect(stateAfterExchange.pocket[0].amount).toBe(213);
  expect(stateAfterExchange.pocket[1].amount).toBe(0);
  expect(stateAfterExchange.pocket[2].amount).toBe(100);
});

it('tests reducer - change rates and exchange', () => {
  const initialState = {
    inputAmount: 0,
    inputCurrency: { currency: 'EUR', symbol: '€' },
    outputAmount: 0,
    outputCurrency: { currency: 'USD', symbol: '$' },
    currencyOptions: [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ],
    currencyRate: 1.13,
    loadingRates: false,
    availableInputAmount: 0,
    availableOutputAmount: 213,
    pocket: [
      { currency: 'USD', amount: 213 },
      { currency: 'EUR', amount: 0 },
      { currency: 'GBP', amount: 100 },
    ],
  };

  const newState = currencyExchange(initialState, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(newState.inputAmount).toBe('100');

  const stateAfterChangeInputCurrency = currencyExchange(newState, {
    type: CHANGE_INPUT_CURRENCY,
    currency: { currency: 'USD', symbol: '$' },
  });
  expect(stateAfterChangeInputCurrency.inputCurrency.currency).toBe('USD');

  const stateAfterChangeOutputCurrency = currencyExchange(stateAfterChangeInputCurrency, {
    type: CHANGE_OUTPUT_CURRENCY,
    currency: { currency: 'EUR', symbol: '€' },
  });
  expect(stateAfterChangeOutputCurrency.outputCurrency.currency).toBe('EUR');

  const stateAfterRatesChange = currencyExchange(stateAfterChangeOutputCurrency, {
    type: RECEIVE_CURRENCY_RATES,
    rate: 0.5111,
  });
  expect(stateAfterRatesChange.currencyRate).toBe(0.5111);
  expect(stateAfterRatesChange.outputAmount).toBe('51.11');

  const exchangeState = currencyExchange(stateAfterRatesChange, { type: EXCHANGE });
  expect(exchangeState.availableInputAmount).toBe(113);
  expect(exchangeState.availableOutputAmount).toBe(51.11);
});

it('tests reducer - should swap currencies and balances', () => {
  const initialState = {
    inputAmount: 0,
    inputCurrency: { currency: 'EUR', symbol: '€' },
    outputAmount: 0,
    outputCurrency: { currency: 'USD', symbol: '$' },
    currencyOptions: [
      { currency: 'USD', symbol: '$' },
      { currency: 'EUR', symbol: '€' },
      { currency: 'GBP', symbol: '£' },
    ],
    currencyRate: 1.13,
    loadingRates: false,
    availableInputAmount: 50,
    availableOutputAmount: 213,
    pocket: [
      { currency: 'USD', amount: 213 },
      { currency: 'EUR', amount: 50 },
      { currency: 'GBP', amount: 100 },
    ],
  };

  const newState = currencyExchange(initialState, {
    type: UPDATE_ALL_CURRENCIES,
    inputCurrency: { currency: 'USD', symbol: '$' },
    outputCurrency: { currency: 'EUR', symbol: '€' },
  });

  expect(newState.availableInputAmount).toBe(213);
  expect(newState.availableOutputAmount).toBe(50);
});
