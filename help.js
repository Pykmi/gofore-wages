const commandLineUsage = require('command-line-usage');

const guide = [
  {
    header: 'Monthly Wage Calculation System',
    content: 'Calculates monthly wages based on CVS files'
  },
  {
    headers: 'Options',
    optionList: [
      {
        name: 'file',
        typeLabel: '{underline file}',
        description: 'CVS file containing employee time data.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
];

const usage = commandLineUsage(guide);

module.exports = { usage };