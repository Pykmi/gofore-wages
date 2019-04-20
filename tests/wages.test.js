const moment = require('moment');
const expect = require('chai').expect;
const { eveningWage, normalWage, overTimeWage } = require('../wages');
const { getEveningTime, getNormalTime, getOverTime } = require('../queries');
const { MINUTES, DAY } = require('../constants');

describe('Calculate wages', () => {
  const normal = [
    { dollars: 4.25, minutes: 60, },
    { dollars: 42.5, minutes: 600 },
    { dollars: 36.125, minutes: 510 }
  ];

  const evening = [
    { dollars: 38.5, minutes: 420, },
    { dollars: 26.125, minutes: 285 },
    { dollars: 50.875, minutes: 555 }
  ];

  const overtime = [
    { dollars: 10.625, minutes: 120, },
    { dollars: 19.125, minutes: 210 },
    { dollars: 22.3125, minutes: 240 },
    { dollars: 30.8125, minutes: 300 }
  ];

  normal.map((data) => {
    it(`should return ${data.dollars} dollars (${data.minutes / 60} hour normal hours)`, () => {
      const salary = normalWage(data.minutes);
      expect(salary).to.be.equal(data.dollars);
    });
  });

  evening.map((data) => {
    it(`should return ${data.dollars} dollars (${data.minutes / 60} hour evening hours)`, () => {
      const salary = eveningWage(data.minutes);
      expect(salary).to.be.equal(data.dollars);
    });
  });

  overtime.map((data) => {
    it(`should return ${data.dollars} dollars (${data.minutes / 60} hour overtime hours)`, () => {
      const salary = overTimeWage(data.minutes);
      expect(salary).to.be.equal(data.dollars);
    });
  });
});