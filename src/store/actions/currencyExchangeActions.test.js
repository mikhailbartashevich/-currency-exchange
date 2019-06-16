import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  LOAD_CURRENCY_RATES,
  RECEIVE_CURRENCY_RATES,
  fetchRates,
  receiveRates,
  changeOutputCurrency,
  CHANGE_INPUT_CURRENCY,
  changeInputCurrency,
  CHANGE_OUTPUT_CURRENCY,
  CHANGE_OUTPUT_AMOUNT,
  changeOutputAmount,
  changeInputAmount,
  CHANGE_INPUT_AMOUNT,
  UPDATE_ALL_CURRENCIES,
  updateOutputCurrency,
  updateInputCurrency,
} from './currencyExchangeActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to receieve rate', () => {
    const rate = 1.22;
    const expectedAction = {
      type: RECEIVE_CURRENCY_RATES,
      rate,
    };
    expect(receiveRates(rate)).toEqual(expectedAction);
  });

  it('should create actions to change currencies', () => {
    const currency = { currency: 'EUR', symbol: '€' };
    const expectedAction = {
      type: CHANGE_OUTPUT_CURRENCY,
      currency,
    };
    expect(changeOutputCurrency(currency)).toEqual(expectedAction);

    const inputCurrency = { currency: 'USD', symbol: '$' };
    const expectedInputAction = {
      type: CHANGE_INPUT_CURRENCY,
      currency: inputCurrency,
    };
    expect(changeInputCurrency(inputCurrency)).toEqual(expectedInputAction);
  });

  it('should create actions to change amounts', () => {
    const amount = 10;
    const expectedAction = {
      type: CHANGE_OUTPUT_AMOUNT,
      amount,
    };
    expect(changeOutputAmount(amount)).toEqual(expectedAction);

    const inputAmount = 100;
    const expectedInputAction = {
      type: CHANGE_INPUT_AMOUNT,
      amount: inputAmount,
    };
    expect(changeInputAmount(inputAmount)).toEqual(expectedInputAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_CURRENCY_RATES when fetching rates has been done', () => {
    fetchMock.getOnce(
      'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD',
      {
        body: { base: 'EUR', rates: { USD: 1.13 }, date: '2019-06-14' },
        headers: { 'content-type': 'application/json' },
      },
    );

    const expectedActions = [
      { type: LOAD_CURRENCY_RATES },
      { type: RECEIVE_CURRENCY_RATES, rate: 1.13 },
    ];
    const store = mockStore({
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
    });

    return store
      .dispatch(
        fetchRates(
          { currency: 'EUR', symbol: '€' },
          { currency: 'USD', symbol: '$' },
        ),
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('swap actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates swap actions when change output currency has been done', () => {
    fetchMock.getOnce(
      'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR',
      {
        body: { base: 'USD', rates: { EUR: 0.89 }, date: '2019-06-14' },
        headers: { 'content-type': 'application/json' },
      },
    );

    const expectedActions = [
      {
        type: UPDATE_ALL_CURRENCIES,
        outputCurrency: { currency: 'EUR', symbol: '€' },
        inputCurrency: { currency: 'USD', symbol: '$' },
      },
      { type: LOAD_CURRENCY_RATES },
      { type: RECEIVE_CURRENCY_RATES, rate: 0.89 },
    ];
    const store = mockStore({
      currencyExchange: {
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
      },
    });

    return store
      .dispatch(updateOutputCurrency({ currency: 'EUR', symbol: '€' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates swap actions when change input currency has been done', () => {
    fetchMock.getOnce(
      'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR',
      {
        body: { base: 'USD', rates: { EUR: 0.89 }, date: '2019-06-14' },
        headers: { 'content-type': 'application/json' },
      },
    );

    const expectedActions = [
      {
        type: UPDATE_ALL_CURRENCIES,
        outputCurrency: { currency: 'EUR', symbol: '€' },
        inputCurrency: { currency: 'USD', symbol: '$' },
      },
      { type: LOAD_CURRENCY_RATES },
      { type: RECEIVE_CURRENCY_RATES, rate: 0.89 },
    ];
    const store = mockStore({
      currencyExchange: {
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
      },
    });

    return store
      .dispatch(updateInputCurrency({ currency: 'USD', symbol: '$' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
