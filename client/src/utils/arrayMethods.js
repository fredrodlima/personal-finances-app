const sortArrayByDay = (array) => {
  return array.sort((a, b) => a.day - b.day);
};

const calculateTotal = (array, type) => {
  return array
    .filter((transaction) => transaction.type === type)
    .map((transaction) => {
      return {
        value: transaction.value,
      };
    })
    .reduce((acc, curr) => (acc += curr.value), 0);
};

export default { sortArrayByDay, calculateTotal };
