const addTime = ({ days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }, date = new Date()) => {
  const daysToAdd = days * 24 * 60 * 60 * 1000;
  const hoursToAdd = hours * 60 * 60 * 1000;
  const minutesToAdd = minutes * 60 * 1000;
  const secondsToAdd = seconds * 1000;
  const timeToAdd = daysToAdd + hoursToAdd + minutesToAdd + secondsToAdd + milliseconds;
	date.setTime(date.getTime() + timeToAdd);
  return date;
}

export default addTime;