const commandLineArgs = require('command-line-args');
const chalk = require('chalk');
const { usage } = require('./help');
const { open, reader } = require('./read');
const { processLine, display } = require('./process');

const log = console.log;
const err = chalk.red;

const options = [
  { name: 'file', alias: 'f', type: String, defaultValue: 'hour-list.cvs' },
  { name: 'help', alias: 'h', type: Boolean }
];

const cli = commandLineArgs(options);

if(cli.help) {
  log(usage);
  return;
}

// open file and check for errors
const { handle, error } = open(cli.file);
if(error) {
  log(err(error));
  return;
}

// read the file line by line and process the data
reader(handle, processLine, display);