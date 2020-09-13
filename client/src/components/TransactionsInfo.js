import React from 'react';
import { formatCurrency } from '../utils/formatNumber';

import css from './transactionsinfo.module.css';

export default function TransactionsInfo({
  transactions,
  income,
  expenses,
  balance,
}) {
  return (
    <div className={css.flexRow}>
      <span className={css.transaction}>
        Transactions: <strong>{transactions}</strong>{' '}
      </span>
      <span className={css.income}>
        Income:{' '}
        <strong className={css.positiveNumber}>{formatCurrency(income)}</strong>{' '}
      </span>

      <span className={css.expenses}>
        Expenses:{' '}
        <strong className={css.negativeNumber}>
          {formatCurrency(expenses)}
        </strong>
      </span>

      <span className={css.balance}>
        Balance:{' '}
        <strong
          className={balance > 0 ? css.positiveNumber : css.negativeNumber}
        >
          {formatCurrency(balance)}
        </strong>
      </span>
    </div>
  );
}
