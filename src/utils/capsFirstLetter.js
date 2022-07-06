const capsFirstLetter = (input) => {
  const str = input;
  let retVal = '';
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      retVal += str[i].toUpperCase();
    } else {
      retVal += str[i].toLowerCase();
    }
  }
  return retVal;
};

export default capsFirstLetter;