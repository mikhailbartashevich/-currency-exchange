import React from 'react';
import './Balance.css';

export function Balance(props) {
  return (
    <span className="Balance">
      <span>{props.amount} {props.currency ? props.currency.symbol : ''}</span>
    </span>
  );
}
