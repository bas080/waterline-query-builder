let _ = require('../index');
let expect = require('chai').expect;

describe('builder', () => {
  let queryFn;

  beforeEach(() => {
    queryFn = _.builder(person => {
      return _.keyPairs(
        _.equals({eyes: person.eyes}),
        _.greaterThanOrEqual({age: person.age}),
        _.lessThan({age: 100})
      );
    });
  });

  it('returs a function that takes data', () => {
    expect(typeof queryFn).to.equal('function');
  });

  it('generates a correct query object', () => {

    let query = queryFn({
      eyes: 'brown',
      age: 40
    });

    expect(query).to.deep.equal({
      eyes: "brown",
      age: {
        greaterThanOrEqual: 40,
        lessThan: 100
      },
    });
  });
});

describe('contains', () => {
  it('generates correctly formed object', () => {
    expect(_.contains({name: 'tom'})).to.deep.equal({name: {contains: 'tom'}});
  });
});

describe('inPairs', () => {
  it('generates correctly formed object', () => {
    expect(_.inPairs({a: 0, b: [1, 2]})).to.deep.equal({
      a: [0],
      b: [1,2]
    });
  });
});

describe('notInPairs', () => {
  it('generates correctly formed object', () => {
    expect(_.notInPairs({a: 0, b: [1, 2]})).to.deep.equal({
      a: {'!': [0]},
      b: {'!': [1,2]}
    });
  });
});

describe('orPairs', () => {
  it('generates correctly formed object', () => {

    expect(_.orPairs({a:1, b:2})).to.deep.equal({
      or: [
        {a: 1},
        {b: 2}
      ]
    });
  })
});

describe('options', () => {

  it('adds options property', () => {
    let optionsQuery = _.builder((data, query) => {
      return {
        where: {},
        limit: 20,
        skip: 10,
        sort: 'name'
      };
    });

    expect(optionsQuery({})).to.deep.equal({
      limit: 20,
      skip: 10,
      sort: 'name',
      where: {}
    });
  });

});
