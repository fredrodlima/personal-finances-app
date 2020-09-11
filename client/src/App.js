import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import InputSearch from './components/InputSearch';
import Periods from './components/Periods';
import TransactionService from './services/TransactionService';
import Transactions from './components/Transactions';

import arrayMethods from './utils/arrayMethods';

export default function App() {
  const [textSearch, setTextSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [allPeriods, setAllPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const getAllPeriods = async () => {
      const result = await TransactionService.getAllDistinctPeriods();
      setAllPeriods(result.data);

      setSelectedPeriod(result.data[0]);
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    const getTransactionByPeriod = async () => {
      if (selectedPeriod) {
        const result = await TransactionService.getTransactionsByPeriod(
          selectedPeriod
        );
        const preparedArray = result.data.transactions.map((transaction) => {
          const { _id, day, category, description, value, type } = transaction;
          return {
            id: _id,
            day,
            category,
            description,
            value,
            type,
            descriptionLowerCase: description.toLowerCase(),
          };
        });

        const sortedArray = arrayMethods.sortArrayByDay(preparedArray);

        setTransactions(sortedArray);
        setFilteredTransactions(sortedArray);
      }
    };
    getTransactionByPeriod();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleSearch = (text) => {
    setTextSearch(text);
    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.descriptionLowerCase.includes(text)
      )
    );
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case '<': {
        let index = allPeriods.findIndex((period) => period === selectedPeriod);
        if (index > 0) {
          setSelectedPeriod(allPeriods[index - 1]);
        }
        break;
      }
      case '>': {
        let index = allPeriods.findIndex((period) => period === selectedPeriod);
        if (index < allPeriods.length - 1) {
          setSelectedPeriod(allPeriods[index + 1]);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <div className="appHeader">
        <Button value="<" onButtonClick={handleButtonClick} />
        <Periods
          periods={allPeriods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />
        <Button value=">" onButtonClick={handleButtonClick} />
      </div>
      <div>
        <Button value="+ New Transaction" />
        <InputSearch text={textSearch} onSearchChange={handleSearch} />
        <Transactions transactions={filteredTransactions} />
      </div>
    </div>
  );
}
