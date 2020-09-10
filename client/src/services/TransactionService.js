import http from '../http-common.js';

const getAllDistinctPeriods = () => {
  return http.get('/api/transaction/getAllDistinctPeriods');
};

const getTransactionsByPeriod = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

export default {
  getAllDistinctPeriods,
  getTransactionsByPeriod,
};
