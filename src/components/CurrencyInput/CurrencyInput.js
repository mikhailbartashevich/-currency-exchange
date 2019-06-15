import React from 'react';
import './CurrencyInput.css';
import { Select, MenuItem, TextField } from '@material-ui/core';

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    const { amount, currency, currencyOptions, actions } = props;
    this.state = { amount, currency, currencyOptions, actions };
  }

  handleAmountChange = amount => {
    this.props.actions.changeAmount(this.truncate(amount));
  };

  handleCurrencyChange = currency => {
    this.props.actions.changeCurrency(
      this.props.currencyOptions.find(option => option.currency === currency),
    );
  };

  truncate(value) {
    const match = value.toString().match(/^\d+(?:\.\d{0,2})?/);
    return match ? match[0] : '';
  }

  render() {
    const options = this.props.currencyOptions.map(option => (
      <MenuItem key={option.currency} value={option.currency}>
        {option.currency}
      </MenuItem>
    ));
    return (
      <div className="CurrencyInput">
        <Select
          value={this.props.currency.currency}
          onChange={e => this.handleCurrencyChange(e.target.value)}
        >
          {options}
        </Select>
        <TextField
          type="number"
          value={this.props.amount}
          onChange={e => this.handleAmountChange(e.target.value)}
          margin="normal"
        />
      </div>
    );
  }
}
