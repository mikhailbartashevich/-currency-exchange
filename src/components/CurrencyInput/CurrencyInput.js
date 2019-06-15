import React from 'react';
import './CurrencyInput.css';

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    const { amount, currency, currencyOptions, actions } = props;
    this.state = { amount, currency, currencyOptions, actions };
  }

  handleAmountChange = amount => {
    const updated = amount ? Number(amount) : 0;
    this.props.actions.changeAmount(Number(this.truncate(updated)));
  };

  handleCurrencyChange = currency => {
    this.props.actions.changeCurrency(
      this.props.currencyOptions.find(option => option.currency === currency),
    );
  };

  truncate(value) {
    const match = value.toString().match(/^\d+(?:\.\d{0,2})?/);
    return match ? match[0] : 0;
  }

  render() {
    const options = this.props.currencyOptions.map(option => (
      <option key={option.currency} value={option.currency}>
        {option.currency}
      </option>
    ));
    return (
      <div>
        <input
          className="CurrencyInput_input"
          type="number"
          step=".01"
          onChange={e => this.handleAmountChange(e.target.value)}
          value={this.props.amount}
        />
        <select
          onChange={e => this.handleCurrencyChange(e.target.value)}
          value={this.props.currency.currency}
        >
          {options}
        </select>
      </div>
    );
  }
}
