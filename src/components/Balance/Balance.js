import React from 'react';
import './Balance.css';
import { pure } from 'recompose';
import PropTypes from 'prop-types';

export const BalanceRaw = props => (
  <span className="Balance">
    <span>
      {props.amount} {props.currency ? props.currency.symbol : ''}
    </span>
  </span>
);

BalanceRaw.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.shape({
    currency: PropTypes.string,
    symbol: PropTypes.string,
  }),
};

export const Balance = pure(BalanceRaw);
