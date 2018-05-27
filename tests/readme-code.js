const varsof = require('../index.js');
let object = {
  weight: 100,
  shape: 'round',
  color: '#00ff00',
  child: {
    born: false
  }
};
let beforeProps = Object.getOwnPropertyNames(object), // properties on object
    beforeSyms = Object.getOwnPropertySymbols(object); // symbols on object
varsof(object).secretProperty = 'foo';
console.log(object.secretProperty); // undefined, as expected
console.log(varsof(object).secretProperty); // foo, as expected
let afterProps = Object.getOwnPropertyNames(object),
    afterSyms = Object.getOwnPropertySymbols(object);
console.log(beforeProps.length === afterProps.length && beforeSyms.length ===
afterSyms.length); // true, as expected
let same = true;
beforeProps.forEach((prop, i) => {
  same = same && beforeProps[i] === afterProps[i]
});
beforeSyms.forEach((sym, i) => {
  same = same && beforeSyms[i] === afterSyms[i]
});
console.log(same); // true, as expected
