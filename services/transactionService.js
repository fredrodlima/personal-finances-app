import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';

const getTransactionByPeriod = async (period) => {
  const transactions = TransactionModel.find({ yearMonth: period });
  return transactions;
};

const getTransactionById = async (id) => {
  const transactions = TransactionModel.find({ _id: ObjectId(id) });
  return transactions;
};

const addTransaction = async (newTransaction) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = newTransaction;
  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });
  await transaction.save();
  return transaction;
};

const updateTransaction = async (id, transaction) => {
  const updatedTransaction = await TransactionModel.findByIdAndUpdate(
    ObjectId(id),
    transaction,
    { new: true }
  );
  return updatedTransaction;
};

const deleteTransaction = async (id) => {
  const deletedTransaction = await TransactionModel.findByIdAndRemove(
    ObjectId(id)
  );
  return deletedTransaction;
};

export default {
  getTransactionByPeriod,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
