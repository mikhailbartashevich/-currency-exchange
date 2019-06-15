import fetch from 'cross-fetch';

export const UPDATE_ALL_CURRENCIES = 'UPDATE_ALL_CURRENCIES';
export const updateAllCurrencies = (inputCurrency, outputCurrency) => {
  return {
    type: UPDATE_ALL_CURRENCIES,
    inputCurrency,
    outputCurrency,
  };
};

export const swapCurrencies = (inputCurrency, outputCurrency) => {
  return dispatch => {
    dispatch(fetchRates(inputCurrency, outputCurrency));
    dispatch(updateAllCurrencies(inputCurrency, outputCurrency));
  };
};

export const CHANGE_INPUT_AMOUNT = 'CHANGE_INPUT_AMOUNT';
export const changeInputAmount = amount => ({
  type: CHANGE_INPUT_AMOUNT,
  amount,
});

export const UPDATE_INPUT_CURRENCY = 'UPDATE_INPUT_CURRENCY';
export const updateInputCurrency = inputCurrency => {
  return (dispatch, getState) => {
    const outputCurrency = getState().currencyExchange.outputCurrency;
    if (inputCurrency.currency === outputCurrency.currency) {
      dispatch(swapCurrencies(inputCurrency, getState().currencyExchange.inputCurrency));
    } else {
      dispatch(changeInputCurrency(inputCurrency));
      dispatch(fetchRates(inputCurrency, outputCurrency));
    }
  };
};

export const CHANGE_INPUT_CURRENCY = 'CHANGE_INPUT_CURRENCY';
export const changeInputCurrency = currency => ({
  type: CHANGE_INPUT_CURRENCY,
  currency,
});

export const UPDATE_OUTPUT_CURRENCY = 'UPDATE_OUTPUT_CURRENCY';
export const updateOutputCurrency = outputCurrency => {
  return (dispatch, getState) => {
    const inputCurrency = getState().currencyExchange.inputCurrency;
    if (inputCurrency.currency === outputCurrency.currency) {
      dispatch(swapCurrencies(getState().currencyExchange.outputCurrency, outputCurrency));
    } else {
      dispatch(changeOutputCurrency(outputCurrency));
      dispatch(fetchRates(inputCurrency, outputCurrency));
    }
  };
};

export const EXCHANGE = 'EXCHANGE';
export const exchange = () => ({
  type: EXCHANGE,
});

export const CHANGE_OUTPUT_AMOUNT = 'CHANGE_OUTPUT_AMOUNT';
export const changeOutputAmount = amount => ({
  type: CHANGE_OUTPUT_AMOUNT,
  amount,
});

export const CHANGE_OUTPUT_CURRENCY = 'CHANGE_OUTPUT_CURRENCY';
export const changeOutputCurrency = currency => ({
  type: CHANGE_OUTPUT_CURRENCY,
  currency,
});

export const LOAD_CURRENCY_RATES = 'LOAD_CURRENCY_RATES';
export const loadRates = () => ({
  type: LOAD_CURRENCY_RATES,
});

export const RECEIVE_CURRENCY_RATES = 'RECEIVE_CURRENCY_RATES';
export const receiveRates = rate => ({
  type: RECEIVE_CURRENCY_RATES,
  rate,
});

export const ERROR_CURRENCY_RATES = 'ERROR_CURRENCY_RATES';
export const errorRates = () => ({
  type: ERROR_CURRENCY_RATES,
});

const requestRates = (base, symbol) =>
  fetch(
    `https://api.exchangeratesapi.io/latest?base=${base.currency}&symbols=${
      symbol.currency
    }`,
  );

export const fetchRates = (base, symbol) => dispatch => {
  dispatch(loadRates());
  requestRates(base, symbol)
    .then(response => response.json(), error => dispatch(errorRates()))
    .then(json => dispatch(receiveRates(json.rates[symbol.currency])));
};
