import React from 'react';
import './Rate.css';
import { pure } from 'recompose';
import { CurrencyPropType } from '../../model/currency.model';

const RateRaw = props => (
  <div className="Rate">
    1 {props.inputCurrency ? props.inputCurrency.symbol : ''} = {props.rate}{' '}
    {props.outputCurrency ? props.outputCurrency.symbol : ''}
  </div>
);

RateRaw.propTypes = {
  outputCurrency: CurrencyPropType,
  inputCurrency: CurrencyPropType,
};

export const Rate = pure(RateRaw);
