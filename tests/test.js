const varsof = require('../index.js');

function fail () {
  throw new Error('failure');
  process.exit();
}

function pass () {
  console.log('pass');
}

let object = {
  foo: 'bar'
};

let propertiesBefore = Object.getOwnPropertyNames(object),
    symbolsBefore = Object.getOwnPropertySymbols(object);

for (let i = 0; i < 100; i++) {
  varsof(object)[`var${i}`] = `value${100 - i}`;
}

for (let i = 0; i < 100; i++) {
  if (varsof(object)[`var${i}`] !== `value${100 - i}`) {
    fail();
  }
}

let propertiesAfter = Object.getOwnPropertyNames(object),
    symbolsAfter = Object.getOwnPropertySymbols(object);

if (propertiesAfter.length !== propertiesBefore.length) {
  fail();
}

for (let i = 0; i < propertiesAfter.length; i++) {
  if (propertiesAfter[i] !== propertiesBefore[i]) {
    fail();
  }
}

for (let i = 0; i < symbolsAfter.length; i++) {
  if (symbolsAfter[i] !== symbolsBefore[i]) {
    fail();
  }
}

object = {};

if (varsof(object)['var0']) {
  fail();
}

let key = varsof.createKey();

varsof(object, key).testing = 'hello, world';

if (varsof(object).testing) {
  fail();
}

if (varsof(object, key).testing !== 'hello, world') {
  fail();
}

pass();
