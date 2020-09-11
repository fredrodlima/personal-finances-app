import React from 'react';
import { formatCurrency, formatTwoDigits } from '../utils/formatNumber';
import css from './transaction.module.css';

export default function Transaction({ transaction }) {
  const containerClass = `${css.transactionContainer} ${
    transaction.type === '-' ? css.negativeNumber : css.positiveNumber
  }`;
  return (
    <li key={transaction.id} className={containerClass}>
      <span className={css.dayOfMonth}>{formatTwoDigits(transaction.day)}</span>
      <div className={css.transactionInfo}>
        <span className={css.category}>{transaction.category}</span>
        <br />
        <span className={css.description}>{transaction.description}</span>
      </div>
      <div>
        <span className={css.currency}>
          {formatCurrency(transaction.value)}
        </span>
      </div>
      <div>
        <span className="material-icons">edit</span>
        <span className="material-icons">delete</span>
      </div>
    </li>
  );
}
