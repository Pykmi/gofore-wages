const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

/* CONSTANTS */
const MINUTES = 'minutes';
const HOURS = 'hours';
const DAY = 'day';

/* FUNCTIONS */
const getEveningTime = (start, end) => {
  const evening = moment.range(moment('19:00', 'HH:mm'), moment('06:00', 'HH:mm').add(1, DAY));
  const range = moment.range(start, end);

  return range.intersect(evening).diff(MINUTES);
};

const getNormalTime = (start, end) => {
  const normal = moment.range(moment('06:00', 'HH:mm'), moment('19:00', 'HH:mm'));
  const range = moment.range(start, end);

  return range.intersect(normal).diff(MINUTES);
};

const getOverTime = (start, end) => {
  const total = end.diff(start, MINUTES);
  return (total > 480 ? total - 480 : 0);
};

/* LOGIC */
let start = moment('18:00', 'HH:mm');
let end = moment('03:00', 'HH:mm');

end.isBefore(start) && end.add(1, DAY);

const overtime = getOverTime(start, end);
const evening = getEveningTime(start, end.clone().subtract(overtime, MINUTES));
const normal = getNormalTime(start, end.clone().subtract(overtime, MINUTES));

const total = end.diff(start, MINUTES);

/* DISPLAY INFORMATION */
console.log(`Total: ${total} minutes`);
console.log(`Total: ${end.diff(start, HOURS)} hours`);

console.log(`\nOvertime: ${overtime}`);
console.log(`Evening Time: ${evening}`);
console.log(`Normal Time: ${normal}`);