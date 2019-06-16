import {
  CHANGE_INPUT_AMOUNT,
  CHANGE_OUTPUT_AMOUNT,
  CHANGE_OUTPUT_CURRENCY,
  CHANGE_INPUT_CURRENCY,
  LOAD_CURRENCY_RATES,
  RECEIVE_CURRENCY_RATES,
  ERROR_CURRENCY_RATES,
  EXCHANGE,
  UPDATE_ALL_CURRENCIES,
} from '../actions/currencyExchangeActions';

export const initialState = {
  inputAmount: '0',
  inputCurrency: { currency: 'EUR', symbol: '€' },
  outputAmount: '0',
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

const roundValue = value => Math.round(value * 100) / 100;

const findMoney = (pocket, currency) => {
  const money = pocket.find(money => money.currency === currency.currency);
  return money ? money.amount : 0;
};

const updatePocket = state => {
  if (
    state.inputCurrency.currency === state.outputCurrency.currency ||
    state.availableInputAmount < Number(state.inputAmount) ||
    !state.inputAmount
  ) {
    return state.pocket;
  }
  return state.pocket.map(money => {
    if (money.currency === state.inputCurrency.currency) {
      return {
        ...money,
        amount: roundValue((money.amount -= Number(state.inputAmount))),
      };
    }
    if (money.currency === state.outputCurrency.currency) {
      return {
        ...money,
        amount: roundValue((money.amount += Number(state.outputAmount))),
      };
    }
    return money;
  });
};

export const currencyExchange = (state = initialState, action) => {
  switch (action.type) {
    case EXCHANGE:
      const pocket = updatePocket(state);
      return {
        ...state,
        inputAmount: '0',
        outputAmount: '0',
        availableInputAmount: findMoney(pocket, state.inputCurrency),
        availableOutputAmount: findMoney(pocket, state.outputCurrency),
        pocket,
      };
    case CHANGE_INPUT_AMOUNT:
      return {
        ...state,
        inputAmount: String(action.amount),
        outputAmount: String(roundValue(action.amount * state.currencyRate)),
      };
    case CHANGE_INPUT_CURRENCY:
      return {
        ...state,
        inputCurrency: action.currency,
        availableInputAmount: findMoney(state.pocket, action.currency),
      };
    case CHANGE_OUTPUT_AMOUNT:
      return {
        ...state,
        inputAmount: String(roundValue(action.amount / state.currencyRate)),
        outputAmount: String(action.amount),
      };
    case CHANGE_OUTPUT_CURRENCY:
      return {
        ...state,
        outputCurrency: action.currency,
        availableOutputAmount: findMoney(state.pocket, action.currency),
      };
    case UPDATE_ALL_CURRENCIES:
      return {
        ...state,
        outputCurrency: action.outputCurrency,
        inputCurrency: action.inputCurrency,
        availableInputAmount: findMoney(state.pocket, action.inputCurrency),
        availableOutputAmount: findMoney(state.pocket, action.outputCurrency),
      };
    case LOAD_CURRENCY_RATES:
      return {
        ...state,
        loadingRates: true,
      };
    case RECEIVE_CURRENCY_RATES:
      return {
        ...state,
        loadingRates: false,
        currencyRate: roundValue(action.rate),
        outputAmount: String(roundValue(state.inputAmount * action.rate)),
      };
    case ERROR_CURRENCY_RATES:
      return {
        ...state,
        loadingRates: false,
      };
    default:
      return state;
  }
};
