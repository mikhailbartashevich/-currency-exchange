import { connect } from 'react-redux';
import { Exchanger } from '../../components/Exchanger/Exchanger';
import {
  changeInputAmount,
  changeOutputAmount,
  updateInputCurrency,
  updateOutputCurrency,
  exchange,
  fetchRates,
  swapCurrencies,
} from '../../store/actions/currencyExchangeActions';

const mapStateToProps = state => {
  const {
    inputAmount,
    inputCurrency,
    outputAmount,
    outputCurrency,
    currencyRate,
    currencyOptions,
    availableInputAmount,
    availableOutputAmount,
  } = state.currencyExchange;
  return {
    inputAmount,
    inputCurrency,
    outputAmount,
    outputCurrency,
    currencyRate,
    currencyOptions,
    availableInputAmount,
    availableOutputAmount,
  };
};

const mapDispatchToProps = dispatch => ({
  changeInputAmount: amount => dispatch(changeInputAmount(amount)),
  changeInputCurrency: currency => dispatch(updateInputCurrency(currency)),
  changeOutputAmount: amount => dispatch(changeOutputAmount(amount)),
  changeOutputCurrency: currency => dispatch(updateOutputCurrency(currency)),
  exchange: _ => dispatch(exchange()),
  fetchRates: (inputCurrency, outputCurrency) =>
    dispatch(fetchRates(inputCurrency, outputCurrency)),
  swapCurrencies: _ => dispatch(swapCurrencies()),
});

export const CurrencyExchanger = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exchanger);
