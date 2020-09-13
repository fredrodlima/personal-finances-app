import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions, onEdit, onDelete }) {
  const onClickEdit = (id) => {
    onEdit(id);
  };
  const onClickDelete = (id) => {
    onDelete(id);
  };
  return (
    <div className="col s12">
      <ul>
        {transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}
