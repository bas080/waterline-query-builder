let extend = require('extend');

/**
 * returns a new object where all pairs are flattened into a single one
 *
 * @param {...objects} pairs
 *
 * @returns {object}
 */
let keyPairs = (...pairs) => {
  return extend.bind(null, true).apply(null, pairs);
};

/**
 *
 * @param {
 *
 */
let modifiedPairs = (pairs, modifier) => {
  return keyPairs.apply(null,
    Object.keys(pairs).map(key => {
      return {
        [key]: {[modifier]: pairs[key]}
      };
    })
  );
};

let inPairs = pairs => {
  return mapObject(pairs, toArray);
};

let notInPairs = pairs => {
  return modifiedPairs(inPairs(pairs), '!');
};

let orPairs = pairs => {
  return {
    'or': Object.keys(pairs).map(key => {return {[key]: pairs[key]}})
  };
};

let andPairs = pairs => {
  return {
    'and': Object.keys(pairs).map(key => {return {[key]: pairs[key]}})
  };
};

let builder = (fn) => {
  return data => {
    return fn(data);
  };
};

let equals = pairs => {
  return keyPairs(pairs);
};

let wqob = {
  builder,
  keyPairs,
  modifiedPairs,
  inPairs,
  notInPairs,
  orPairs,

  /* convenience */
  equals
};

[ 'lessThan',
  'lessThanOrEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'not',
  'like',
  'contains',
  'startsWith',
  'endsWith'
].forEach(modifier => {
  wqob[modifier] = pairs => {
    return modifiedPairs(pairs, modifier);
  };
});

module.exports = wqob;

/* helpers */

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

function mapObject(object, fn) {
  let result = {};
  for (key in object) {
    result[key] = fn(object[key], key, object);
  }
  return result;
}

