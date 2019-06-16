import React from 'react';
import './Rate.css';
import { pure } from 'recompose';
import PropTypes from 'prop-types';

const RateRaw = props => (
  <div className="Rate">
    1 {props.inputCurrency ? props.inputCurrency.symbol : ''} = {props.rate}{' '}
    {props.outputCurrency ? props.outputCurrency.symbol : ''}
  </div>
);

RateRaw.propTypes = {
  outputCurrency: PropTypes.shape({
    currency: PropTypes.string,
    symbol: PropTypes.string,
  }),
  inputCurrency: PropTypes.shape({
    currency: PropTypes.string,
    symbol: PropTypes.string,
  }),
};

export const Rate = pure(RateRaw);
