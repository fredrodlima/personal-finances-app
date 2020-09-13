import http from '../http-common.js';

const getAllDistinctPeriods = () => {
  return http.get('/api/transaction/getAllDistinctPeriods');
};

const getTransactionsByPeriod = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

const createTransaction = (transaction) => {
  return http.post(`/api/transaction`, transaction);
};

const updateTransaction = (transaction) => {
  return http.update(`/api/transaction/${transaction.id}`, transaction);
};

export default {
  getAllDistinctPeriods,
  getTransactionsByPeriod,
  createTransaction,
  updateTransaction,
};
