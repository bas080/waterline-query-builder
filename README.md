# Waterline Query Object Builder

Build waterline query objects using declarative functions.

## Installation

`npm install waterline-query-string-builder`

> or

`jspm install npm:waterline-query-string-builder`

## Usage

Before you start it is best to read more about what
[waterline](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md)
is.

So now that you know that pairs are represented as simple javascript objects,
we can continue to look at an example.

> example that uses the builder function.

```js

  let w = require('waterline-query-builder');

  let personQuery = w.builder(person => {

    return keyPairs(
      w.equals({eyes: person.eye_color}),
      w.greaterThanOrEqual({age: person.age}),
      w.lessThan({age: 100})
    );

  });

```

## Api

### keyPairs(...pairs) *=>* `object`

It takes multiple objects and returns a single object that contains the
properties of the other objects.

TODO
