const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
const { MINUTES, DAY } = require('./constants');

const getEveningTime = (start, end) => {
  const evening = moment.range(moment('19:00', 'HH:mm'), moment('06:00', 'HH:mm').add(1, DAY));
  const range = moment.range(start, end);

  if(!range.intersect(evening)) {
    return 0;
  }

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

module.exports = { getEveningTime, getNormalTime, getOverTime };