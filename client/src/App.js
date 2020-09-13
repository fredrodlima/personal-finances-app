import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import Button from './components/Button';
import InputSearch from './components/InputSearch';
import Periods from './components/Periods';
import TransactionService from './services/TransactionService';
import Transactions from './components/Transactions';
import TransactionsInfo from './components/TransactionsInfo';

import arrayMethods from './utils/arrayMethods';
import { formatTwoDigits } from './utils/formatNumber';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function App() {
  const [textSearch, setTextSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [allPeriods, setAllPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isIncome, setIsIncome] = useState(true);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [date, setDate] = useState('');

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
        calculateTotals(sortedArray);
      }
    };
    getTransactionByPeriod();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleSearch = (text) => {
    setTextSearch(text);
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.descriptionLowerCase.includes(text)
    );
    setFilteredTransactions(filteredTransactions);
    calculateTotals(filteredTransactions);
  };

  const calculateTotals = (array) => {
    const income = arrayMethods.calculateTotal(array, '+');
    const expenses = arrayMethods.calculateTotal(array, '-');
    const balance = income - expenses;
    setIncome(income);
    setExpenses(expenses);
    setBalance(balance);
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
      case '+ New Transaction': {
        const newDate = new Date();
        console.log(newDate.getFullYear());
        console.log(newDate.getMonth());
        console.log(newDate.getDate());
        setDate(
          `${newDate.getFullYear()}-${formatTwoDigits(
            newDate.getMonth() + 1
          )}-${formatTwoDigits(newDate.getDate())}`
        );
        setModalTitle('Add new Transaction');
        openModal();
        break;
      }
      default:
        break;
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTypeSelect = () => {
    setIsIncome(!isIncome);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSave = () => {
    const formattedDate = new Date(date);
    console.log(formattedDate);
    console.log(formattedDate.getFullYear());
    console.log(formattedDate.getMonth());
    console.log(formattedDate.getDate());
    const transaction = {
      description,
      category,
      type: isIncome ? '+' : '-',
      value,
      year: formattedDate.getFullYear(),
      month: formattedDate.getMonth() + 1,
      day: formattedDate.getDate(),
      yearMonth: `${formattedDate.getFullYear()}-${formatTwoDigits(
        formattedDate.getMonth() + 1
      )}`,
      yearMonthDay: date,
    };
    TransactionService.createTransaction(transaction);
    closeModal();
  };

  return (
    <div>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <h4>{modalTitle}</h4>
          <button onClick={closeModal}>close</button>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="-"
              id="income"
              name="typeTransaction"
              checked={isIncome}
              onChange={handleTypeSelect}
            />
            <span>Income</span>
          </label>
          <label>
            <input
              type="radio"
              value="-"
              name="typeTransaction"
              id="expense"
              checked={!isIncome}
              onChange={handleTypeSelect}
            />
            <span>Expense</span>
          </label>
        </div>
        <div className="input-field col s6">
          <input
            placeholder="Description"
            id="description"
            type="text"
            className="validate"
            value={description}
            onChange={handleDescriptionChange}
          ></input>
          <label htmlFor="description" className="active"></label>
        </div>
        <div className="input-field col s6">
          <input
            placeholder="Category"
            id="catergory"
            type="text"
            required
            className="validate"
            value={category}
            onChange={handleCategoryChange}
          ></input>
          <label htmlFor="category" className="active"></label>
        </div>
        <div className="input-field col s6">
          <input
            placeholder="Value"
            id="value"
            type="number"
            step="0.01"
            required
            className="validate"
            min="0"
            value={value}
            onChange={handleValueChange}
          ></input>
          <input
            placeholder="Date"
            id="date"
            type="date"
            required
            value={date}
            onChange={handleDateChange}
            className="validate"
          ></input>
        </div>
        <input type="button" value="Save" onClick={handleSave}></input>
      </Modal>

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
        <TransactionsInfo
          transactions={filteredTransactions.length}
          income={income}
          expenses={expenses}
          balance={balance}
        />
      </div>
      <div>
        <Button value="+ New Transaction" onButtonClick={handleButtonClick} />
        <InputSearch text={textSearch} onSearchChange={handleSearch} />
        <Transactions transactions={filteredTransactions} />
      </div>
    </div>
  );
}
