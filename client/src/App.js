import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import InputSearch from './components/InputSearch';
import Periods from './components/Periods';
import TransactionService from './services/TransactionService';

export default function App() {
  const [textSearch, setTextSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(selectedPeriod);
  const [allPeriods, setAllPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getAllPeriods = async () => {
      const result = await TransactionService.getAllDistinctPeriods();
      setAllPeriods(result.data);

      //setCurrentPeriod(getCurrentPeriod(data));
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    const getTransactionByPeriod = async () => {
      const transactions = await TransactionService.getTransactionsByPeriod(
        selectedPeriod
      );
    };
    getTransactionByPeriod();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleSearch = (text) => {
    setTextSearch(text);
  };

  return (
    <div>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <div className="appHeader">
        <Button value="<" />
        <Periods periods={allPeriods} onPeriodChange={handlePeriodChange} />
        <Button value=">" />
      </div>
      <div>
        <Button value="+ New Transaction" />
        <InputSearch text={textSearch} onSearchChange={handleSearch} />
      </div>
    </div>
  );
}
