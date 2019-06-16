import React from 'react';
import './Exchanger.css';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import { Rate } from '../Rate/Rate';
import { Balance } from '../Balance/Balance';
import { ExchangeFab } from '../ExchangeFab/ExchangeFab';
import { lifecycle, pure } from 'recompose';
import PropTypes from 'prop-types';

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
  inputCurrency: PropTypes.shape({
    currency: PropTypes.string,
    symbol: PropTypes.string,
  }),
  availableInputAmount: PropTypes.number,
  changeInputAmount: PropTypes.func,
  changeInputCurrency: PropTypes.func,

  outputAmount: PropTypes.string,
  outputCurrency: PropTypes.shape({
    currency: PropTypes.string,
    symbol: PropTypes.string,
  }),
  availableOutputAmount: PropTypes.number,
  changeOutputAmount: PropTypes.func,
  changeOutputCurrency: PropTypes.func,

  exchange: PropTypes.func,
  currencyOptions: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      symbol: PropTypes.string,
    }),
  ),
};

export const Exchanger = pure(
  lifecycle({
    componentDidMount() {
      this.props.fetchRates &&
        this.props.fetchRates(
          this.props.inputCurrency,
          this.props.outputCurrency,
        );
      clearInterval(this.fetchInterval);
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
