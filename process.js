const moment = require('moment');
const chalk = require('chalk');
const { getEveningTime, getNormalTime, getOverTime } = require('./queries');
const { eveningWage, normalWage, overTimeWage } = require('./wages');
const { DAY } = require('./constants');

const log = console.log;
const text = chalk.yellow.bold;
const store = {};

// round a number
const round = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

// process a line of data
const processLine = (line) => {
  const [ name, id, date, start, end ] = line.split(',');

  // convert reported time period to moment.js type
  const timeBegin = moment(start, 'HH:mm');
  const timeEnd = moment(end, 'HH:mm');

  timeEnd.isBefore(timeBegin) && timeEnd.add(1, DAY);

  // check if user already has a record
  if(!store.hasOwnProperty(name)) {
    store[name] = {
      id,
      worked: { normal: 0, evening: 0, overtime: 0 },
      wages: { normal: 0, evening: 0, overtime: 0 }
    };
  }

  // perform time quiries to separate the reported time periods to minutes and different salary types
  store[name].worked.normal += getNormalTime(timeBegin, timeEnd);
  store[name].worked.evening += getEveningTime(timeBegin, timeEnd);
  store[name].worked.overtime += getOverTime(timeBegin, timeEnd);

  return store;
};

// calculate and display the wages
const processResults = (store) => {
  // place an empty line between prompt and the results
  log('');

  // calculate total wages and round them to max two decimals
  Object.keys(store).forEach((name) => {
    store[name].wages.normal = round(normalWage(store[name].worked.normal), 2);
    store[name].wages.evening = round(eveningWage(store[name].worked.evening), 2);
    store[name].wages.overtime = round(overTimeWage(store[name].worked.overtime), 2);
  });

  // display the final results
  Object.keys(store).forEach((name) => {
    const salary = round(store[name].wages.normal + store[name].wages.evening + store[name].wages.overtime, 2);
    const minutes = store[name].worked.normal + store[name].worked.evening + store[name].worked.overtime;
    const hours = round(minutes / 60, 2);
    const days = round(hours / 24, 1);

    log(chalk.green(`${text(name)}\tearned ${text(salary)} dollars:`));
    log(chalk.green(`\t\tworked ${text(days)} days ${text(hours)} hours ${text(minutes)} minutes`));
    log('');
  });
};

module.exports = { processLine, processResults };