import React from 'react';
import './CurrencyInput.css';
import {
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { pure } from 'recompose';
import PropTypes from 'prop-types';
import { CurrencyPropType } from '../../model/currency.model';

const truncate = value => {
  const match = value.toString().match(/^\d+(?:\.\d{0,2})?/);
  return match ? match[0] : '';
};

const handleAmountChange = props => amount =>
  props.actions.changeAmount(truncate(amount));

const handleCurrencyChange = props => currency =>
  props.actions.changeCurrency(
    props.currencyOptions.find(option => option.currency === currency),
  );

const CurrencyInputRaw = props => {
  const currencies = props.currencyOptions || [];
  const options = currencies.map(option => (
    <MenuItem key={option.currency} value={option.currency}>
      {option.currency}
    </MenuItem>
  ));
  return (
    <div className="CurrencyInput">
      <Select
        input={<OutlinedInput />}
        className="CurrencyInput_select"
        value={props.currency ? props.currency.currency : ''}
        onChange={e => handleCurrencyChange(props)(e.target.value)}
      >
        {options}
      </Select>
      <TextField
        type="number"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.currency.symbol}
            </InputAdornment>
          ),
        }}
        value={props.amount}
        onChange={e => handleAmountChange(props)(e.target.value)}
        margin="normal"
      />
    </div>
  );
};

CurrencyInputRaw.propTypes = {
  actions: PropTypes.shape({
    changeAmount: PropTypes.func,
    changeCurrency: PropTypes.func,
  }),
  amount: PropTypes.string,
  currencyOptions: PropTypes.arrayOf(CurrencyPropType),
  currency: CurrencyPropType,
};

export const CurrencyInput = pure(CurrencyInputRaw);
