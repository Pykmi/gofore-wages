const fs = require('fs');
const readline = require('readline');

// open file
const open = (file) => {
  if(!fs.existsSync(file)) {
    return { handle: false, error: `File ${file} doesn't exist` };
  }

  const handle = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  return { handle, error: false };
};

// read through the file and call appropriate callback functions to process data
const reader = (handle, read, results) => {
  let current = 1;
  let store;

  handle.on('line', (line) => {
    store = (current > 1 ? read(line) : store);
    current++;
  }).on('close', () => {
    results(store);
  });
};

module.exports = { open, reader };