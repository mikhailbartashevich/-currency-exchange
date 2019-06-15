import React from 'react';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';
import './Exchanger.css';
import { Rate } from '../Rate/Rate';

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
      <div>
        <div className="Exchanger_field">
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
        </div>

        <div className="Exchanger_field">
          <span className="Exchanger_label">You have</span>
          <span>{this.props.availableInputAmount}&nbsp;</span>
          <span>{this.props.inputCurrency.symbol}</span>
        </div>

        <div className="Exchanger_rate">
          <Rate
            rate={this.props.currencyRate}
            inputCurrency={this.props.inputCurrency}
            outputCurrency={this.props.outputCurrency}
          />
        </div>

        <div className="Exchanger_field">
          <CurrencyInput
            amount={this.props.outputAmount}
            currency={this.props.outputCurrency}
            currencyOptions={this.props.currencyOptions}
            actions={{
              changeAmount: this.props.changeOutputAmount,
              changeCurrency: this.props.changeOutputCurrency,
            }}
          />
        </div>

        <div className="Exchanger_field">
          <span className="Exchanger_label">You have</span>
          <span>{this.props.availableOutputAmount}&nbsp;</span>
          <span>{this.props.outputCurrency.symbol}</span>
        </div>
        <div>
          <button
            onClick={this.props.exchange}
            disabled={this.props.availableInputAmount < this.props.inputAmount}
          >
            Exchange
          </button>
        </div>
      </div>
    );
  }
}
