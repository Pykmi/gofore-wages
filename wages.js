const { NORMAL_WAGE, EVENING_WAGE, LOW_OVERTIME_MULTIPLIER, MEDIUM_OVERTIME_MULTIPLIER, HIGH_OVERTIME_MULTIPLIER } = require('./constants');

const toHours = (minutes) => minutes / 60;

// wage calculations
const normalWage = (minutes) => toHours(minutes) * NORMAL_WAGE;

const eveningWage = (minutes) => toHours(minutes) * EVENING_WAGE;

const overTimeWage = (minutes) => {
  const hours = toHours(minutes);

  // calculate the wage for the first three overtime hours
  const time = (hours <= 3 ? hours : 3);
  const lowWage = time * LOW_OVERTIME_MULTIPLIER * NORMAL_WAGE;
  
  // calculate the wage for the hour past the first three overtime hours
  let diff = (hours > 4 ? hours - (hours - 1) : hours - 4 + 1);
  const medWage = (diff > 0 ? diff * MEDIUM_OVERTIME_MULTIPLIER * NORMAL_WAGE : 0);

  // calculate the wage for the hours past the first four overtime hours
  diff = (hours - 4 > 0 ? hours - 4 : 0);
  const highWage = diff * HIGH_OVERTIME_MULTIPLIER * NORMAL_WAGE;

  return lowWage + medWage + highWage;
};

module.exports = { eveningWage, normalWage, overTimeWage };