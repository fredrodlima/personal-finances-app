const sortArrayByDay = (array) => {
  return array.sort((a, b) => a.day - b.day);
};

export default { sortArrayByDay };
