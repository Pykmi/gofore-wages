/* const expect = require('chai').expect;
const { open, reader } = require('../read');
const { DATA, FIRST_LINE } = require('../constants');

const handle = open('./files/testfile.csv');

describe('Reading SCV file', () => {
  const heads = [ 'Person Name', 'Person ID', 'Date', 'Start', 'End' ];

  it('testing this test', () => expect(file).to.be.equal(file));

  reader(handle, (line, type) => {
    const [ name, id, date, start, end ] = line.split(',');

    if(type === FIRST_LINE) {
      it(`first caption should be ${heads[0]}`, () => expect(name).to.be.equal(heads[0]));
      it(`first caption should be ${heads[1]}`, () => expect(name).to.be.equal(heads[1]));
      it(`first caption should be ${heads[2]}`, () => expect(name).to.be.equal(heads[2]));
      it(`first caption should be ${heads[3]}`, () => expect(name).to.be.equal(heads[3]));
      it(`first caption should be ${heads[4]}`, () => expect(name).to.be.equal(heads[4]));
    }
  });
}); */