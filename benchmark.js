const varsof = require('./index.js');

const ITERATIONS = 100;

const ITERATIONS_INNER = 10000;

let object = {};

let start = Date.now(); // will replace Date.now with better perf measure

for (let i = 0; i < ITERATIONS; i++) {
  for (let j = 0; j < ITERATIONS_INNER; j++) {
    object._count = object._count ? object._count++ : 1;
    object[`property${j}`] = `value${100 - j}`;
  }
  let count = 0;
  for (let j = 0; j < ITERATIONS_INNER; j++) {
    if (object[`property${j}`] === `value${100 - j}`) {
      count++;
    }
  }
  if (count !== ITERATIONS_INNER) {
    throw new Error();
  }
}

let end = Date.now();

console.log(((end - start) / ITERATIONS) + 'ms average');

start = Date.now();

for (let i = 0; i < ITERATIONS; i++) {
  for (let j = 0; j < ITERATIONS_INNER; j++) {
    varsof(object)._count = varsof(object)._count ? varsof(object)._count++ : 1;
    varsof(object)[`property${j}`] = `value${100 - j}`;
  }
  let count = 0;
  for (let j = 0; j < ITERATIONS_INNER; j++) {
    if (varsof(object)[`property${j}`] === `value${100 - j}`) {
      count++;
    }
  }
  if (count !== ITERATIONS_INNER) {
    throw new Error();
  }
}

end = Date.now();

console.log(((end - start) / ITERATIONS) + 'ms average');
