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

const updateTransaction = (id, transaction) => {
  return http.put(`/api/transaction/${id}`, transaction);
};

const deleteTransaction = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

export default {
  getAllDistinctPeriods,
  getTransactionsByPeriod,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
