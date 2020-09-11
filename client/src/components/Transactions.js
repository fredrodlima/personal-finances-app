import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions }) {
  return (
    <div className="col s12">
      <ul>
        {transactions.map((transaction) => {
          return <Transaction key={transaction.id} transaction={transaction} />;
        })}
      </ul>
    </div>
  );
}
