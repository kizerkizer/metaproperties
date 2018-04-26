# metaproperties
Associate data with any object without modifying it in any way. Implemented using WeakMaps. Works in browser and node.js.

# installation
`npm install metaproperties --save`

# syntax
```javascript
require('metaproperties')(object: Object [, key: Symbol]): Object
require('metaproperties').createKey(): Symbol
```

# usage
```javascript
const varsof = require('metaproperties');
let object = {
  weight: 100,
  shape: 'round',
  color: '#00ff00',
  child: {
    born: false
  }
};
varsof(object).secretProperty = 'foo';
console.log(object.secretProperty); // undefined, as expected
console.log(varsof(object).secretProperty); // foo, as expected
```

# objects unaffected
```javascript
let beforeProps = Object.getOwnPropertyNames(object), // properties on object
    beforeSyms = Object.getOwnPropertySymbols(object); // symbols on object
varsof(object).secretProperty = 'foo';
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
```

# performance
Run `benchmark.js`. First line represents native (setting properties directly on object) performance, second line represents metaproperties' performance. My typical results in node.js:
  16.29ms average (native)
  29.44ms average (metaproperties)

Performance penalty should be minimal if `varsof(...)` is not used in critical
performance sections.

# secret keys
Specify a key to use as an access key. Must use `varsof.createKey` to create a
key.
```javascript
const varsof = require('metaproperties');
let key = varsof.createKey();
varsof(someObject, key).bigSecret = 'abc123';
varsof(someObject).bigSecret // undefined, as expected
varsof(someObject, key).bigSecret // 'abc123';
```

Dispose of access keys once no longer needed:
```javascript
varsof.destroyKey(key: Symbol): void
```

# license
MIT

# feedback
Create issues here on github or email `metapropertiesfeedback [at symbol] [google's email service]`.
