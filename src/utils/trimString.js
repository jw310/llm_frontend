const trimString = (str) => {
  return str && str.trim() !== '' ? str.trim() : null;
};

export default trimString;