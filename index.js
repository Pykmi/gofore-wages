const chalk = require('chalk');
const { open, reader } = require('./read');
const { processLine, processResults } = require('./process');

const log = console.log;

// open file and check for errors
const { handle, error } = open('./files/hour-list.cvs');
if(error) {
  log(chalk.red(error));
  return;
}

// read the file line by line and process the data
reader(handle, processLine, processResults);