import React from 'react';
import './Exchanger.css';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import { Rate } from '../Rate/Rate';
import { Balance } from '../Balance/Balance';
import { ExchangeFab } from '../ExchangeFab/ExchangeFab';
import { lifecycle, pure } from 'recompose';
import PropTypes from 'prop-types';
import { CurrencyPropType } from '../../model/currency.model';
import { SwapIconButton } from '../SwapIconButton/SwapIconButton';

export const ExchangerRaw = props => (
  <div className="Exchanger">
    <div className="Exchanger_top-section">
      <CurrencyInput
        className="Exchanger_input"
        amount={props.inputAmount}
        currency={props.inputCurrency}
        currencyOptions={props.currencyOptions}
        actions={{
          changeAmount: props.changeInputAmount,
          changeCurrency: props.changeInputCurrency,
        }}
      />

      <div className="Exchanger_field">
        <span className="Exchanger_label">You have</span>
        <Balance
          amount={props.availableInputAmount}
          currency={props.inputCurrency}
        />
      </div>
    </div>
    <div className="Exchanger_bottom-section">
      <div className="Exchanger_rate">
        <Rate
          rate={props.currencyRate}
          inputCurrency={props.inputCurrency}
          outputCurrency={props.outputCurrency}
        />
      </div>
      <SwapIconButton onClick={props.swapCurrencies} />

      <CurrencyInput
        amount={props.outputAmount}
        currency={props.outputCurrency}
        currencyOptions={props.currencyOptions}
        actions={{
          changeAmount: props.changeOutputAmount,
          changeCurrency: props.changeOutputCurrency,
        }}
      />

      <div className="Exchanger_field">
        <span className="Exchanger_label">You have</span>
        <Balance
          amount={props.availableOutputAmount}
          currency={props.outputCurrency}
        />
      </div>
      <div className="Exchanger_submit">
        <ExchangeFab
          variant="extended"
          aria-label="Exchange"
          onClick={props.exchange}
          disabled={
            props.availableInputAmount < props.inputAmount ||
            !Number(props.inputAmount)
          }
        >
          Exchange
        </ExchangeFab>
      </div>
    </div>
  </div>
);

ExchangerRaw.propTypes = {
  inputAmount: PropTypes.string,
  inputCurrency: CurrencyPropType,
  availableInputAmount: PropTypes.number,
  changeInputAmount: PropTypes.func,
  changeInputCurrency: PropTypes.func,

  outputAmount: PropTypes.string,
  outputCurrency: CurrencyPropType,
  availableOutputAmount: PropTypes.number,
  changeOutputAmount: PropTypes.func,
  changeOutputCurrency: PropTypes.func,

  exchange: PropTypes.func,
  currencyOptions: PropTypes.arrayOf(CurrencyPropType),
};

export const Exchanger = pure(
  lifecycle({
    componentDidMount() {
      this.props.fetchRates &&
        this.props.fetchRates(
          this.props.inputCurrency,
          this.props.outputCurrency,
        );
      this.fetchInterval = setInterval(
        () =>
          this.props.fetchRates(
            this.props.inputCurrency,
            this.props.outputCurrency,
          ),
        10000,
      );
    },

    componentWillUnmount() {
      clearInterval(this.fetchInterval);
    },
  })(ExchangerRaw),
);
