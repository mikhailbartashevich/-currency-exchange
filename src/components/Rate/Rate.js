import React from 'react';
import './Rate.css';

export function Rate(props) {
  return (
    <div className="Rate">
      <span>
        1 {props.inputCurrency.symbol} = {props.rate} {props.outputCurrency.symbol}
      </span>
    </div>
  );
}
