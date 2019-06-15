import { currencyExchange, initialState } from './currencyExchange';
import {
  EXCHANGE,
  CHANGE_INPUT_CURRENCY,
  CHANGE_INPUT_AMOUNT,
  CHANGE_OUTPUT_CURRENCY,
  RECEIVE_CURRENCY_RATES,
} from '../actions/currencyExchangeActions';

it('tests reducer', () => {
  let newState = currencyExchange(initialState, { type: EXCHANGE });
  expect(newState.availableInputAmount).toBe(100);

  newState = currencyExchange(newState, {
    type: CHANGE_INPUT_CURRENCY,
    currency: { currency: 'EUR', symbol: '€' },
  });
  expect(newState.inputCurrency.currency).toBe('EUR');

  newState = currencyExchange(newState, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(newState.inputAmount).toBe('100');

  newState = currencyExchange(newState, { type: EXCHANGE });

  expect(newState.availableInputAmount).toBe(0);
  expect(newState.availableOutputAmount).toBe(213);
});

it('tests reducer - no EUR in pocket', () => {
  let newState = {
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

  newState = currencyExchange(newState, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(newState.inputAmount).toBe('100');

  newState = currencyExchange(newState, { type: EXCHANGE });
  expect(newState.availableInputAmount).toBe(0);
  expect(newState.availableOutputAmount).toBe(213);

  expect(newState.pocket[0].amount).toBe(213);
  expect(newState.pocket[1].amount).toBe(0);
  expect(newState.pocket[2].amount).toBe(100);
});

it('tests reducer - change rates and exchange', () => {
  let newState = {
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

  newState = currencyExchange(newState, {
    type: CHANGE_INPUT_AMOUNT,
    amount: '100',
  });
  expect(newState.inputAmount).toBe('100');

  newState = currencyExchange(newState, {
    type: CHANGE_INPUT_CURRENCY,
    currency: { currency: 'USD', symbol: '$' },
  });
  expect(newState.inputCurrency.currency).toBe('USD');

  newState = currencyExchange(newState, {
    type: CHANGE_OUTPUT_CURRENCY,
    currency: { currency: 'EUR', symbol: '€' },
  });
  expect(newState.outputCurrency.currency).toBe('EUR');

  newState = currencyExchange(newState, {
    type: RECEIVE_CURRENCY_RATES,
    rate: 0.5,
  });
  expect(newState.currencyRate).toBe(0.5);
  expect(newState.outputAmount).toBe(50);

  newState = currencyExchange(newState, { type: EXCHANGE });
  expect(newState.availableInputAmount).toBe(113);
  expect(newState.availableOutputAmount).toBe(50);
});
