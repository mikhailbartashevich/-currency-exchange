import React from 'react';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import './Exchanger.css';
import { Rate } from '../Rate/Rate';
import { Balance } from '../Balance/Balance';
import { ExchangeFab } from '../ExchangeFab/ExchangeFab';

export class Exchanger extends React.Component {
  componentDidMount() {
    this.props.fetchRates(this.props.inputCurrency, this.props.outputCurrency);
    clearInterval(this.fetchInterval);
    this.fetchInterval = setInterval(
      () =>
        this.props.fetchRates(
          this.props.inputCurrency,
          this.props.outputCurrency,
        ),
      10000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    return (
      <div className="Exchanger">
        <div className="Exchanger_top-section">
          <CurrencyInput
            className="Exchanger_input"
            amount={this.props.inputAmount}
            currency={this.props.inputCurrency}
            currencyOptions={this.props.currencyOptions}
            actions={{
              changeAmount: this.props.changeInputAmount,
              changeCurrency: this.props.changeInputCurrency,
            }}
          />

          <div className="Exchanger_field">
            <span className="Exchanger_label">You have</span>
            <Balance
              amount={this.props.availableInputAmount}
              currency={this.props.inputCurrency}
            />
          </div>
        </div>
        <div className="Exchanger_bottom-section">
          <div className="Exchanger_rate">
            <Rate
              rate={this.props.currencyRate}
              inputCurrency={this.props.inputCurrency}
              outputCurrency={this.props.outputCurrency}
            />
          </div>

          <CurrencyInput
            amount={this.props.outputAmount}
            currency={this.props.outputCurrency}
            currencyOptions={this.props.currencyOptions}
            actions={{
              changeAmount: this.props.changeOutputAmount,
              changeCurrency: this.props.changeOutputCurrency,
            }}
          />

          <div className="Exchanger_field">
            <span className="Exchanger_label">You have</span>
            <Balance
              amount={this.props.availableOutputAmount}
              currency={this.props.outputCurrency}
            />
          </div>
          <div className="Exchanger_submit">
            <ExchangeFab
              variant="extended"
              aria-label="Exchange"
              onClick={this.props.exchange}
              disabled={
                this.props.availableInputAmount < this.props.inputAmount ||
                !this.props.inputAmount
              }
            >
              Exchange
            </ExchangeFab>
          </div>
        </div>
      </div>
    );
  }
}
