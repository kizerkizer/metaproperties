# metaproperties
Associate data with any object without modifying it in any way. Install with
`npm install metaproperties --save`.

# usage and demonstration of no mutation
    const varsof = require('metaproperties');
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

# performance
Run `benchmark.js`. First line is native (setting properties directly on object), second line is metaproperties. My typical results in node.js:
  16.29ms average
  29.44ms average

# secret keys

