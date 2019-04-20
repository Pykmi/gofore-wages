const moment = require('moment');
const expect = require('chai').expect;
const { getEveningTime, getNormalTime, getOverTime } = require('../queries');
const { MINUTES, DAY } = require('../constants');

describe('Breaking down timecards', () => {
  const timecards = [
    { start: '08:00', end: '16:00', expected: { normal: 480, evening: 0, overtime: 0 } },
    { start: '12:00', end: '21:00', expected: { normal: 420, evening: 60, overtime: 60 } },
    { start: '10:00', end: '21:00', expected: { normal: 480, evening: 0, overtime: 180 } },
    { start: '18:00', end: '03:00', expected: { normal: 60, evening: 420, overtime: 60 } }
  ];

  timecards.map((card) => {
    const start = moment(card.start, 'HH:mm');
    let end = moment(card.end, 'HH:mm');

    end.isBefore(start) && end.add(1, DAY);

    const overtime = getOverTime(start, end);

    it(`${card.start} to ${card.end}: should return ${card.expected.evening} evening work minutes`, () => {
      const minutes = getEveningTime(start, end.clone().subtract(overtime, MINUTES));
      expect(minutes).to.be.equal(card.expected.evening);
    });
  
    it(`${card.start} to ${card.end}: should return ${card.expected.normal} normal work minutes`, () => {
      const minutes = getNormalTime(start, end.clone().subtract(overtime, MINUTES));
      expect(minutes).to.be.equal(card.expected.normal);
    });
  
    it(`${card.start} to ${card.end}: should return ${card.expected.overtime} overtime minutes`, () => {
      expect(overtime).to.be.equal(card.expected.overtime);
    });
  });
});