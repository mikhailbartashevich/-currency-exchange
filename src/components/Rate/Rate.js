import React from 'react';
import './Rate.css';

export function Rate(props) {
  return (
    <div className="Rate">
      <span>1&nbsp;{props.inputCurrency.symbol}&nbsp;=&nbsp;</span>
      <span className="Rate_value">{props.rate}</span>
      <span className="">&nbsp;{props.outputCurrency.symbol}</span>
    </div>
  );
}
