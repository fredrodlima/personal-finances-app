import React from 'react';
import { formatCurrency, formatTwoDigits } from '../utils/formatNumber';
import css from './transaction.module.css';

export default function Transaction({
  transaction,
  onClickEdit,
  onClickDelete,
}) {
  const containerClass = `${css.transactionContainer} ${
    transaction.type === '-' ? css.negativeNumber : css.positiveNumber
  }`;
  const handleEditClick = (event) => {
    onClickEdit(transaction.id);
  };
  const handleDeleteClick = (event) => {
    onClickDelete(transaction.id);
  };
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
        <button
          value="edit"
          className="waves-effect waves-teal btn-flat"
          onClick={handleEditClick}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          href="#"
          value="delete"
          className="waves-effect waves-teal btn-flat"
          onClick={handleDeleteClick}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </li>
  );
}
